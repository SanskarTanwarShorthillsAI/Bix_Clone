import { DashboardOutlined , UserOutlined} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'


const dashBoardNavTree = [
// {
//   key: 'dashboards',
//   path: `${APP_PREFIX_PATH}/dashboards`,
//   title: 'sidenav.dashboard',
//   icon: DashboardOutlined,
//   breadcrumb: false,
//   isGroupTitle: true,
//   submenu: [
//   ]
// },
{
  key: 'dashboard',
  path: `${APP_PREFIX_PATH}/dashboard`,
  title: 'Home',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: []
},
{
  key: 'customer',
  path: `/customer`,
  title: 'Customer',
  icon:  UserOutlined,
  breadcrumb: false,
  submenu: []
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
