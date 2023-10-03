import React from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Navigation } from '../Navigation/Navigation';
import { Search } from '../Search/Search';
import { ReactComponent as CloseMenu } from '../../images/icons/close.svg';
import { pageData } from '../../data/pageData';

type Props = {
  isMenuActive: boolean;
  onMenuActive: (v: boolean) => void,
};

export const MenuMobile: React.FC<Props> = ({ isMenuActive, onMenuActive }) => {
  const closeMenu = () => {
    onMenuActive(false);
  };

  const handleCloseClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    closeMenu();
  };

  const { pathname } = useLocation();
  const linkWithSearch = pageData
    .map(page => (page.isSearch ? page.link : null));
  const isSearch = linkWithSearch.some(link => link === pathname.slice(1));

  return (
    <div
      id="menu"
      className={cn('menu menu--mobile', { 'menu--active': isMenuActive })}
    >
      <div className="menu__top">
        <div className="menu__search">
          {isSearch && <Search />}
        </div>
        <div className="menu__nav menu__nav--tablet">
          <Navigation />
        </div>
        <a
          className="menu__icon menu__icon--close"
          href="#/"
          onClick={handleCloseClick}
        >
          <CloseMenu />
        </a>
      </div>
      <div className="menu__nav menu__nav--mobile">
        <Navigation />
      </div>
    </div>
  );
};
