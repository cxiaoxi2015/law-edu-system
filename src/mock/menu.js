/**
 * 菜单管理
 **/

export const menuList = [
  {
    path: '/riskManage/dataBoard',
    title: '风险管理',
    icon: '&#xe7fa;',
    children: [
      {
        path: '/riskManage/dataBoard',
        title: '数据看板',
        icon: '&#xeb66;',
        breadcrumb: '风险管理-数据看板'
      },
      {
        path: '/riskManage/bank',
        title: '风险库',
        icon: '&#xeb51;',
        breadcrumb: '风险管理-风险库'
      },
      {
        path: '/riskManage/idenList',
        title: '风险辨识清单',
        icon: '&#xeabc;',
        breadcrumb: '风险管理-风险辨识清单'
      },
      {
        path: '/riskManage/account',
        title: '风险台账',
        icon: '&#xe65f;',
        breadcrumb: '风险管理-风险台账'
      }
    ]
  },
  {
    path: '/riskSummary/dataBoard',
    title: '风险汇总',
    icon: '&#xe625;',
    children: [
      {
        path: '/riskSummary/dataBoard',
        title: '数据看板',
        icon: '&#xeb66;',
        breadcrumb: '风险汇总-数据看板'
      },
      {
        path: '/riskSummary/earlyWarning',
        title: '风险预警',
        icon: '&#xe628;',
        breadcrumb: '风险汇总-风险预警'
      }
    ]
  },
  {
    path: '/roleManage',
    title: '角色管理',
    icon: '&#xe6f4;',
    breadcrumb: '角色管理'
  },
  {
    path: '/journal',
    title: '日志管理',
    icon: '&#xe647;',
    breadcrumb: '日志管理'
  }
];
