import Layout from '@/layout'

const tapRouter = {
  path: '/tap',
  component: Layout,
  name: 'Tap',
  meta: {
    title: '我的设备',
    icon: 'user'
  },
  children: [
    {
      path: 'tapList',
      name: 'Tree',
      component: () => import('@/views/tap/list'),
      meta: { title: '设备列表', icon: 'shopping' }
    },
    {
      path: 'tapClock',
      name: 'Tree',
      component: () => import('@/views/tap/clock'),
      meta: { title: '定时任务', icon: 'shopping' }
    },
    {
      path: 'tapOperateLog',
      name: 'Tree',
      component: () => import('@/views/tap/operateLog'),
      meta: { title: '操作记录', icon: 'shopping' }
    }
  ]
}

export default tapRouter
