import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../router';
import styles from './index.module.scss';
const SideMenu = () => {
  const navigate = useNavigate();
  console.log(routers)
  const menuItems = routers.routes

  const jump = (e: React.MouseEvent, item: any) => {
    navigate(item.path)
    e.stopPropagation()
  }
  return (
    <div className={styles.sideMenu}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} onClick={(e) => jump(e, item)}>
            {item.id}
            {/* <Link to={item.path}>{item.label}</Link> */}
            {item.children && item.children.length &&
              <div className={styles.sideMenuChildren}>
                {item.children.map(child => {
                  return <div onClick={(e) => jump(e, child)}>{child.id}</div>
                })}
              </div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;