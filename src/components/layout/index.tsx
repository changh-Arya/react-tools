import { Outlet } from 'react-router-dom';
import { routers } from '../../router';
import Header from '../header';
import SideMenu from '../side-menu';
import styles from './index.module.scss';
const Layout = () => {
  // const navigate = useNavigate();
  console.log(routers)
  const menuItems = routers.routes

  const jump = (item: any) => {
    // navigate(item.path)
  }
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.sideMenu}><SideMenu /></div>
        <div className={styles.content}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Layout;