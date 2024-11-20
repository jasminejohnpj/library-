import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2b72555a = () => interopDefault(import('..\\pages\\bookdwld.vue' /* webpackChunkName: "pages/bookdwld" */))
const _08ef4f50 = () => interopDefault(import('..\\pages\\bookrequest.vue' /* webpackChunkName: "pages/bookrequest" */))
const _3d32f4ff = () => interopDefault(import('..\\pages\\bookreturn.vue' /* webpackChunkName: "pages/bookreturn" */))
const _cfb9d044 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _05046dfe = () => interopDefault(import('..\\pages\\Deliverypartner.vue' /* webpackChunkName: "pages/Deliverypartner" */))
const _a4e6b688 = () => interopDefault(import('..\\pages\\deliverypartnerlist.vue' /* webpackChunkName: "pages/deliverypartnerlist" */))
const _7676ff36 = () => interopDefault(import('..\\pages\\deliveryrequest.vue' /* webpackChunkName: "pages/deliveryrequest" */))
const _7ae991d8 = () => interopDefault(import('..\\pages\\Managebook.vue' /* webpackChunkName: "pages/Managebook" */))
const _55dd588b = () => interopDefault(import('..\\pages\\memberdwld.vue' /* webpackChunkName: "pages/memberdwld" */))
const _4e1c10fc = () => interopDefault(import('..\\pages\\membership.vue' /* webpackChunkName: "pages/membership" */))
const _b81b795c = () => interopDefault(import('..\\pages\\membershipreq.vue' /* webpackChunkName: "pages/membershipreq" */))
const _1dc30481 = () => interopDefault(import('..\\pages\\memberslist.vue' /* webpackChunkName: "pages/memberslist" */))
const _4753bcaa = () => interopDefault(import('..\\pages\\Mobilemanagement.vue' /* webpackChunkName: "pages/Mobilemanagement" */))
const _4174430d = () => interopDefault(import('..\\pages\\newrelease.vue' /* webpackChunkName: "pages/newrelease" */))
const _6aeb5b56 = () => interopDefault(import('..\\pages\\orderplaced.vue' /* webpackChunkName: "pages/orderplaced" */))
const _55e8134c = () => interopDefault(import('..\\pages\\report.vue' /* webpackChunkName: "pages/report" */))
const _6f7f3029 = () => interopDefault(import('..\\pages\\requstdwld.vue' /* webpackChunkName: "pages/requstdwld" */))
const _fcd93ac8 = () => interopDefault(import('..\\pages\\trends.vue' /* webpackChunkName: "pages/trends" */))
const _31cf961e = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _8b9f9fc8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/bookdwld",
    component: _2b72555a,
    name: "bookdwld"
  }, {
    path: "/bookrequest",
    component: _08ef4f50,
    name: "bookrequest"
  }, {
    path: "/bookreturn",
    component: _3d32f4ff,
    name: "bookreturn"
  }, {
    path: "/dashboard",
    component: _cfb9d044,
    name: "dashboard"
  }, {
    path: "/Deliverypartner",
    component: _05046dfe,
    name: "Deliverypartner"
  }, {
    path: "/deliverypartnerlist",
    component: _a4e6b688,
    name: "deliverypartnerlist"
  }, {
    path: "/deliveryrequest",
    component: _7676ff36,
    name: "deliveryrequest"
  }, {
    path: "/Managebook",
    component: _7ae991d8,
    name: "Managebook"
  }, {
    path: "/memberdwld",
    component: _55dd588b,
    name: "memberdwld"
  }, {
    path: "/membership",
    component: _4e1c10fc,
    name: "membership"
  }, {
    path: "/membershipreq",
    component: _b81b795c,
    name: "membershipreq"
  }, {
    path: "/memberslist",
    component: _1dc30481,
    name: "memberslist"
  }, {
    path: "/Mobilemanagement",
    component: _4753bcaa,
    name: "Mobilemanagement"
  }, {
    path: "/newrelease",
    component: _4174430d,
    name: "newrelease"
  }, {
    path: "/orderplaced",
    component: _6aeb5b56,
    name: "orderplaced"
  }, {
    path: "/report",
    component: _55e8134c,
    name: "report"
  }, {
    path: "/requstdwld",
    component: _6f7f3029,
    name: "requstdwld"
  }, {
    path: "/trends",
    component: _fcd93ac8,
    name: "trends"
  }, {
    path: "/user",
    component: _31cf961e,
    name: "user"
  }, {
    path: "/",
    component: _8b9f9fc8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
