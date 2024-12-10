import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { Menu } from './Menu';
import { NavLinks } from './NavLinks';
import { useEffect, useState } from 'react';
import { PATHS_WHERE_NEED_FIND } from '../utils/rightPaths';
import { useAppSelector } from '../utils/hooks';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();
  const { favourites, cartItems, quantity } = useAppSelector(
    state => state.products,
  );

  const cartItemsLength = cartItems
    ? cartItems.reduce((sum, item) => sum + (quantity[item.itemId] || 0), 0)
    : 0;

  useEffect(() => setIsMenuOpen(false), [pathname]);

  return (
    <nav
      className="
        sticky
        top-0
        z-20
        flex
        h-[48px]
        justify-between
        bg-white-color
        shadow
        xl:h-[64px]
      "
    >
      <div className="flex gap-[16px] xl:gap-[24px]">
        <Link className="px-[16px] py-[13px] xl:px-[24px] xl:py-[18px]" to="/">
          <img
            src="./img/icons/Logo.svg"
            alt="Logo"
            className="h-[22px] w-[64px] xl:h-[28px] xl:w-[80px]"
          />
        </Link>

        <NavLinks />
      </div>

      <div className="flex">
        {!isMenuOpen && PATHS_WHERE_NEED_FIND.includes(pathname.slice(1)) && (
          <SearchBar />
        )}

        <Menu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

        <div className="hidden sm:flex">
          <Link
            to="favourites"
            className="shadow-el nav-icons--active p-[16px] xl:p-[24px]"
          >
            <div className="relative">
              <img
                src="./img/icons/Favourites.svg"
                alt="Favourite"
                className="icons"
              />
              {favourites.length > 0 && (
                <div className="icon-count">{favourites.length}</div>
              )}
            </div>
          </Link>

          <Link
            to="cart"
            className="shadow-el nav-icons--active p-[16px] xl:p-[24px]"
          >
            <div className="relative">
              <img src="./img/icons/Cart.svg" alt="Bag" className="icons" />

              {cartItemsLength > 0 && (
                <div className="icon-count">{cartItemsLength}</div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
