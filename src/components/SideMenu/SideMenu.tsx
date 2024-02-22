import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './SideMenu.scss';
import { MyNavLink } from '../UI/MyNavLink';
import { setScrollState } from '../../helpers/pageHelper';

export const SideMenu = () => {
  const { hash } = useLocation();
  const isSideMenuOpened = hash.includes('side-menu');

  useEffect(() => {
    if (!hash.includes('side-menu')) {
      setScrollState('auto');
    }
  }, [hash]);

  return (
    <aside
      className="side-menu"
      id="side-menu"
      style={{ transform: `translateX(${isSideMenuOpened ? 0 : -100}%)` }}
    >
      <div className="side-menu__header">
        <Link to="/" className="side-menu__icon" />
      </div>

      <div className="side-menu__navbar">
        <MyNavLink to="/"> Home </MyNavLink>
        <MyNavLink to="/phones"> Phones </MyNavLink>
        <MyNavLink to="/tablets"> Tablets </MyNavLink>
        <MyNavLink to="/accessories"> Accessories </MyNavLink>
        <MyNavLink to="/favorite">Favorites </MyNavLink>
        <MyNavLink to="/cart">Cart</MyNavLink>
      </div>
    </aside>
  );
};
