import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './SideMenu.scss';
import { MyNavLink } from '../UI/MyNavLink';
import { setScrollState } from '../../helpers/pageHelper';

export const SideMenu = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash.includes('side-menu')) {
      setScrollState('auto');
    }
  }, [hash]);

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
