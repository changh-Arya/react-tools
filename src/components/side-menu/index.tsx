import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routers } from '../../router';
const SideMenu = () => {
  const navigate = useNavigate();
  console.log(routers)
  const menuItems = routers.routes

  const jump = (e: React.MouseEvent, item: any) => {
    navigate(item.path)
    e.stopPropagation()
  }
  return (
    <div style={{ width: '200px', background: '#f0f0f0', padding: '20px' }}>
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} onClick={(e) => jump(e, item)}>
            {item.id}
            {/* <Link to={item.path}>{item.label}</Link> */}
            {item.children && item.children.map(child => {
              return <div onClick={(e) => jump(e, child)}>{child.id}</div>
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;