import './SideMenu.scss';
import { Link, useLocation } from 'react-router-dom';
import { MyNavLink } from '../UI/MyNavLink';

export const SideMenu = () => {
  const { hash } = useLocation();

  return (
    <aside
      className="side-menu"
      id="side-menu"
      style={{ transform: `translateX(${hash.includes('side-menu') ? 0 : -100}%)` }}
    >
      <div className="side-menu__header">
        <Link to="/" className="side-menu__icon" />
      </div>
      <div className="side-menu__navbar">
        <MyNavLink to="/"> Home </MyNavLink>
        <MyNavLink to="/phones"> Phones </MyNavLink>
        <MyNavLink to="/tablets"> Tablets </MyNavLink>
        <MyNavLink to="/accessories"> Accessories </MyNavLink>
      </div>
    </aside>
  );
};
