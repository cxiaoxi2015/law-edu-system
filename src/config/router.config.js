/**
 * 基础路由
 * @type { *[] }
 */
import Layout from 'layout'

export const defaultRoutes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Layout',
    redirect: 'riskManage/dataBoard',
    component: Layout,
    children: [
      /************** 风险管理 ****************/
      {
        path: 'riskManage/dataBoard',
        name: 'RiskManageDataBoard',
        component: () => import('views/riskManage/dataBoard'),
        meta: {
          title: '风险管理-数据看板',
          requireAuth: true
        }
      },
      {
        path: 'riskManage/bank',
        name: 'RiskBank',
        component: () => import('views/riskManage/bank'),
        meta: {
          title: '风险管理-风险库',
          requireAuth: true
        }
      },
      {
        path: 'riskManage/idenList',
        name: 'RiskIdenList',
        component: () => import('views/riskManage/idenList'),
        meta: {
          title: '风险管理-风险辨识清单',
          requireAuth: true
        }
      },
      {
        path: 'riskManage/account',
        name: 'RiskAccount',
        component: () => import('views/riskManage/account'),
        meta: {
          title: '风险管理-风险台账',
          requireAuth: true
        }
      },
      /************** 风险汇总 ****************/
      {
        path: 'riskSummary/dataBoard',
        name: 'RiskSubmaryDataBoard',
        component: () => import('views/riskSummary/dataBoard'),
        meta: {
          title: '风险汇总-数据看板',
          requireAuth: true
        }
      },
      {
        path: 'riskSummary/earlyWarning',
        name: 'EarlyWarning',
        component: () => import('views/riskSummary/earlyWarning'),
        meta: {
          title: '风险汇总-风险预警',
          requireAuth: true
        }
      },
      /************** 角色管理 ****************/
      {
        path: 'roleManage',
        name: 'RoleManage',
        component: () => import('views/roleManage'),
        meta: {
          title: '角色管理',
          requireAuth: true
        }
      },
      /************** 日志管理 ****************/
      {
        path: 'journal',
        name: 'Journal',
        component: () => import('views/journal'),
        meta: {
          title: '日志管理',
          requireAuth: true
        }
      }
    ]
  }
]
