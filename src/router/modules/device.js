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
      path: 'device_power',
      name: 'Tree',
      component: () => import('@/views/device/power'),
      meta: { title: '电量管理', icon: 'shopping', roles: ['editor'] }
    }
  ]
}

export default deviceRouter
