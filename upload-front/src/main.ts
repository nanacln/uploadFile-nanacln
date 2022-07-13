import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/common.scss'

createApp(App).use(router).use(VueCropper).use(ElementPlus).mount('#app')
