import Vue from 'vue'
import Router from 'vue-router'
import loginComment from '../pages/login'
import homeComment from '../pages/home'
import allReceiverComment from '../pages/home/allReceiver/allReceiver'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: loginComment
    },
    {
      path: '/home',
      component: homeComment,
      redirect: '/home/allReceiver',
      children: [{
        path: 'allReceiver',
        component: allReceiverComment
      }]
    }
  ]
})
