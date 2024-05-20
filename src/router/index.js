import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Student from '../components/home/Student.vue'
import Grade from '../components/home/Grade.vue'
import Course from '../components/home/Course.vue'
import Map from '../components/MapView/Map.vue'
import MapView from '../views/MapView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {path:"student-manage",component:Student},
      {path:"grade-manage",component:Grade},
      {path:"course-manage",component:Course},
      {path:"map-show",component:Map}
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/map',
    name: 'map',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MapView,

  }

  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
