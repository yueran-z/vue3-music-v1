import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from '@/components/base/loading/directive'

// 引入全局样式文件
import '@/assets/scss/index.scss'


// 用webpack引入lazyPlugin,并配置默认loading用webpack引入图片
createApp(App).use(store).use(router)
.use(lazyPlugin,{
    loading: require('@/assets/images/default.png')
})
.directive('loading',loadingDirective)
.mount('#app')
