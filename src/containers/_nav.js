export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Project']
      },
                {
                  _name: 'CSidebarNavItem',
                  name: 'LoadProject',
                  to: '/project/loadproject',
                  icon: 'cil-folder-open'
                },
                {
                  _name: 'CSidebarNavItem',
                  name: 'SaveProject',
                  to: '/project/saveproject',
                  icon: 'cil-save'
                },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Images']
      },
                {
                  _name: 'CSidebarNavDropdown',
                  name: 'Filters',
                  route: '/images/filters',
                  icon: 'cil-wallpaper',
                  items: [
                            {
                              name: 'Histeq',
                              to: '/images/filters/histeq',
                            }
                  ]
                },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },
                {
                  _name: 'CSidebarNavDropdown',
                  name: 'Buttons',
                  route: '/buttons',
                  icon: 'cil-cursor',
                  items: [
                            {
                              name: 'Buttons',
                              to: '/buttons/standard-buttons'
                            },
                            {
                              name: 'Button Dropdowns',
                              to: '/buttons/dropdowns'
                            },
                            {
                              name: 'Button Groups',
                              to: '/buttons/button-groups'
                            },
                            {
                              name: 'Brand Buttons',
                              to: '/buttons/brand-buttons'
                            }
                  ]
                },
      {
        _name: 'CSidebarNavItem',
        name: 'Charts',
        to: '/charts',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Icons',
        route: '/icons',
        icon: 'cil-star',
        items: [
          {
            name: 'CoreUI Icons',
            to: '/icons/coreui-icons',
            badge: {
              color: 'info',
              text: 'NEW'
            }
          },
          {
            name: 'Brands',
            to: '/icons/brands'
          },
          {
            name: 'Flags',
            to: '/icons/flags'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Notifications',
        route: '/notifications',
        icon: 'cil-bell',
        items: [
          {
            name: 'Alerts',
            to: '/notifications/alerts'
          },
          {
            name: 'Badges',
            to: '/notifications/badges'
          },
          {
            name: 'Modals',
            to: '/notifications/modals'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Widgets',
        to: '/widgets',
        icon: 'cil-calculator',
        badge: {
          color: 'primary',
          text: 'NEW',
          shape: 'pill'
        }
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Extras']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pages',
        route: '/pages',
        icon: 'cil-star',
        items: [
          {
            name: 'Login',
            to: '/pages/login'
          },
          {
            name: 'Register',
            to: '/pages/register'
          },
          {
            name: 'Error 404',
            to: '/pages/404'
          },
          {
            name: 'Error 500',
            to: '/pages/500'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Download CoreUI',
        href: 'http://coreui.io/vue/',
        icon: { name: 'cil-cloud-download', class: 'text-white' },
        _class: 'bg-success text-white',
        target: '_blank'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Try CoreUI PRO',
        href: 'http://coreui.io/pro/vue/',
        icon: { name: 'cil-layers', class: 'text-white' },
        _class: 'bg-danger text-white',
        target: '_blank'
      }
    ]
  }
]