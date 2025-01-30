import { useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { IconItem } from '../IconItem/IconItem';
import { useProducts } from '../../utils/ProductsContext';
import { ProductSum } from '../../utils/ProductSum';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../../utils/SearchContext';
import cn from 'classnames';

// icons
import Favourites from '../../../images/Favourites.svg';
import ShoppingBag from '../../../images/Shopping-bag.svg';
import MenuBtn from '../../../images/Menu.png';
import Close from '../../../images/Close.png';
import SearchIcon from '../../../images/Search.svg';

import s from './Header.module.scss';
import { ReactSVG } from 'react-svg';

interface HeaderProps {
  setIsMenuOpen: (value: boolean) => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  setIsMenuOpen,
  isMenuOpen,
}) => {
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();
  const [toggleSearch, setToggleDearch] = useState(false);
  const isSearchPage = ['/phones', '/tablets', '/accessories'].includes(
    location.pathname,
  );

  const onToggleSearch = () => {
    setToggleDearch(!toggleSearch);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { favourites, shoppingBag } = useProducts();
  const shoppingBagSum = ProductSum(shoppingBag);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={s.header}>
      <div className={s.header__navigation}>
        <a className={s.header__logo} href="">
          Nice👌 <br />
          Gadgets
        </a>

        <Navbar />
      </div>

      <ul className={s.icons}>
        {isSearchPage && (
          <div
            className={cn(s['header__search-wrapper'], s[`${toggleSearch}`])}
          >
            <button type="button" onClick={onToggleSearch}>
              <ReactSVG src={SearchIcon} />
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={s.header__search}
            />
          </div>
        )}

        <IconItem
          isMenuOpen={isMenuOpen}
          icon={Favourites}
          route="/favourites"
          notification={favourites.length}
        />
        <IconItem
          isMenuOpen={isMenuOpen}
          icon={ShoppingBag}
          route="/shopping-bag"
          notification={shoppingBagSum}
        />

        <li className={s['icons__item--button']}>
          <button
            type="button"
            className={s['icon-button']}
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <img
                src={Close}
                alt="Close icon"
                className={s['icons__item--image']}
              />
            ) : (
              <img
                src={MenuBtn}
                alt="MenuBtn"
                className={s['icons__item--image']}
              />
            )}
          </button>
        </li>
      </ul>

      <div className={`${s.menu} ${isMenuOpen ? s.true : ''}`}>
        <Navbar
          isOpenMenu={isMenuOpen}
          onCloseMenu={() => setIsMenuOpen(false)}
        />

        <ul className={s.icons__list}>
          <IconItem
            isMenuOpen={isMenuOpen}
            icon={Favourites}
            route="/favourites"
            notification={favourites.length}
          />
          <IconItem
            isMenuOpen={isMenuOpen}
            icon={ShoppingBag}
            route="/shopping-bag"
            notification={shoppingBagSum}
          />
        </ul>
      </div>
    </div>
  );
};
