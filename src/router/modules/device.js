import Layout from '@/layout'

const deviceRouter = {
  path: '/device',
  component: Layout,
  name: 'Tap',
  meta: {
    title: '设备管理',
    icon: 'user',
    roles: ['editor']
  },
  children: [
    {
      path: 'device_list',
      name: 'Tree',
      component: () => import('@/views/device/list'),
      meta: { title: '设备列表', icon: 'shopping', roles: ['editor'] }
    },
    {
      path: 'device_power_log',
      name: 'Tree',
      component: () => import('@/views/device/power_log'),
      meta: { title: '电量管理', icon: 'shopping', roles: ['editor'] }
    },
    {
      path: 'device_operate_log',
      name: 'Tree',
      component: () => import('@/views/device/operate_log'),
      meta: { title: '操作记录', icon: 'shopping', roles: ['editor'] }
    },
    {
      path: 'device_online_log',
      name: 'Tree',
      component: () => import('@/views/device/online_log'),
      meta: { title: '上线记录', icon: 'shopping', roles: ['editor'] }
    }
  ]
}

export default deviceRouter
