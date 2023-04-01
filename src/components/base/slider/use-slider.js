import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)

// 把ref传入做处理: rootRef=wrapperRef
export default function useSlider (wrapperRef) {
  //为什么要定义在onMounted外面? 
  // 1.要return 2.在外面拿的到slider
  const slider = ref(null)
  const currentPageIndex = ref(0)

  //在挂载的时候建立slider实例，在卸载时就要销毁 ----保持一个好习惯
  onMounted(() => {
    const sliderVal = slider.value = new BScroll(wrapperRef.value, {
      click: true, //BScroll的配置项：https://better-scroll.github.io/docs/zh-CN/plugins/slide.html#slide-%E9%80%89%E9%A1%B9%E5%AF%B9%E8%B1%A1
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })

    sliderVal.on('slideWillChange', (page) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value.destroy()
  })

  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })

  onDeactivated(() => {
    slider.value.disable()
  })

  return {
    slider,
    currentPageIndex
  }
}
