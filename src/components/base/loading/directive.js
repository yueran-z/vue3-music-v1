import { createApp } from 'vue'
import Loading from './loading'
import { addClass, removeClass } from '@/assets/js/dom'

const relativeCls = 'g-relative'
// 动态创建一个div，挂载到loading指令作用的el上
// 样式的封装：不依赖与布局，动态传入
// 动态参数传入title
const loadingDirective = {
    mounted(el, binding) {
        const app = createApp(Loading)
        const instance = app.mount(document.createElement('div'))
        el.instance = instance
        
        const title = binding.arg
        if(typeof title !== 'undefined'){
            instance.setTitle(title)
        }


        if(binding.value){
            append(el)
        }
    },
    updated(el, binding) {
        
        const title = binding.arg
        if (typeof title !== 'undefined') {
            el.instance.setTitle(title)
        }

        if(binding.value !== binding.oldValue){
            binding.value ? append(el) : remove(el)
        }
    }
}

function append(el) {
    const style = getComputedStyle(el)
    if(['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
        addClass(el, relativeCls)
    }
    el.appendChild(el.instance.$el)
}
function remove(el){
    removeClass(el, relativeCls)
    el.removeChild(el.instance.$el)
}


export default loadingDirective