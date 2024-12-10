import classNames from 'classnames';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

const getActiveLink = (isActive: { isActive: boolean }) =>
  classNames('nav-link-menu after:bottom-[-8px]', {
    'nav-link--active': isActive,
  });

export const Menu: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { favourites, cartItems, quantity } = useAppSelector(
    state => state.products,
  );

  const cartItemsLength = cartItems
    ? cartItems.reduce((sum, item) => sum + (quantity[item.itemId] || 0), 0)
    : 0;

  return (
    <div className="flex ">
      <div className="flex">
        <button
          onClick={handleOpenMenu}
          className="
            shadow-el
            nav-icons--active
            p-[16px]
            sm:hidden
          "
        >
          <img src="./img/icons/Menu.svg" alt="Menu" className="icons" />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="
          fixed
        bottom-0
          left-0
          right-0
          top-[48px]
          box-border
          overflow-x-hidden
          bg-white-color
        "
        >
          <ul
            className="
              mt-[24px]
              flex
              flex-col
              items-center
              justify-center
              gap-[24px]
            "
          >
            <li className="nav-link--li ">
              <NavLink className={getActiveLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={getActiveLink} to="phones">
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink className={getActiveLink} to="tablets">
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink className={getActiveLink} to="accessories">
                Accessories
              </NavLink>
            </li>
          </ul>

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              flex
              border-[1px]
              border-[rgba(226,230,233,1)]
            "
          >
            <Link
              to="favourites"
              className="
                shadow-el 
                nav-icons--active 
                flex 
                w-[100%] 
                justify-center 
                py-[24px]
              "
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
              className="
                shadow-el 
                nav-icons--active 
                flex 
                w-[100%] 
                justify-center 
                py-[24px]
              "
            >
              <div>
                <img src="./img/icons/Cart.svg" alt="Bag" className="icons" />

                {cartItemsLength > 0 && (
                  <div className="icon-count">{cartItemsLength}</div>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
