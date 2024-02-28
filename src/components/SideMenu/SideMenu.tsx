import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './SideMenu.scss';
import { MyNavLink } from '../UI/MyNavLink';
import { setScrollState } from '../../helpers/pageHelper';

export const SideMenu = () => {
  const { hash, search } = useLocation();
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
        <MyNavLink pathname="/"> Home </MyNavLink>
        <MyNavLink pathname="/phones" search={search}> Phones </MyNavLink>
        <MyNavLink pathname="/tablets"> Tablets </MyNavLink>
        <MyNavLink pathname="/accessories"> Accessories </MyNavLink>
        <MyNavLink pathname="/favorite">Favorites </MyNavLink>
        <MyNavLink pathname="/cart">Cart</MyNavLink>
      </div>
    </aside>
  );
};
