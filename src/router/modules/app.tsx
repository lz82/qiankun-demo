import {
  DashboardOutlined,
  SettingOutlined,
  ToolOutlined,
  TeamOutlined,
  CompassOutlined,
  RocketOutlined
} from '@ant-design/icons';

const appRouter = [
  {
    path: '/admin/app',
    name: '微应用管理',
    icon: ToolOutlined,
    noMenu: false,
    child: [
      {
        path: '/admin/app/g6-editor',
        name: 'G6Editor',
        icon: TeamOutlined,
        exact: true,
        noMenu: false
      }
    ]
  }
];

export default appRouter;
