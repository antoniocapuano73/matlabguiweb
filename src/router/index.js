import Vue from 'vue'
import Router from 'vue-router'

// Containers
const pageHome = () => import('@/containers/TheContainer')

// Views - dashboard
const pageDashboard = () => import('@/views/Dashboard')

// Views - PROJECT
const pageLoadProject = () => import('@/views/project/LoadProject')
const pageSaveProject = () => import('@/views/project/SaveProject')

// Views - TOOLS
const pageImageFilterHisteq = () => import('@/views/imagefilters/Histeq')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function emptyMenuItem() {
  return { render (c) { return c('router-view') }};
}

function configRoutes () {
  return [
    {
      path: '/', redirect: '/dashboard',
      name: 'Home',
      component: pageHome,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: pageDashboard
        },
        {
          path: 'project', redirect: '/project/loadproject',
          name: 'Project',
          component: emptyMenuItem(),
          children: [
                    {
                      path: 'loadproject',
                      name: 'LoadProject',
                      component: pageLoadProject
                    },
                    {
                      path: 'saveproject',
                      name: 'SaveProject',
                      component: pageSaveProject
                    }
          ]
        },
        {
          path: 'imagefilters', redirect: '/imagefilters/histeq',
          name: 'Filters',
          component: emptyMenuItem(),
          children: [
                    {
                      path: 'histeq',
                      name: 'Histeq',
                      component: pageImageFilterHisteq
                    }
          ]
        },
        {
          path: 'buttons', redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: emptyMenuItem(),
          children: [
                    {
                      path: 'standard-buttons',
                      name: 'Standard Buttons',
                      component: StandardButtons
                    },
                    {
                      path: 'button-groups',
                      name: 'Button Groups',
                      component: ButtonGroups
                    },
                    {
                      path: 'dropdowns',
                      name: 'Dropdowns',
                      component: Dropdowns
                    },
                    {
                      path: 'brand-buttons',
                      name: 'Brand Buttons',
                      component: BrandButtons
                    }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}

