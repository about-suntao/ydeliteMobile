import { createApp } from 'vue'
import 'amfe-flexible/index.js'
import './assets/style/index.scss'
import router from './router'

import App from './App.vue'

createApp(App).use(router).mount('#app')
