import { createRouter, createWebHistory } from 'vue-router'
// 项目其他页面路由（推荐使用）

// vue项目自带路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
