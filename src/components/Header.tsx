import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import Logo from '/src/assets/logo.svg?react';
import Favourites from '/src/assets/icons/favourites.svg?react';
import Cart from '/src/assets/icons/cart.svg?react';
import Menu from '/src/assets/icons/menu.svg?react';

export const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-0 flex gap-4 lg:gap-6 h-12 lg:h-16 bg-white shadow-down shadow-elements">
      <NavLink to="/" className="flex items-center px-4 lg:px-6">
        <Logo className="h-[22px] lg:h-7" />
      </NavLink>

      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 h-full lg:gap-16">
          <li className="flex self-stretch">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'header-nav-link',
                  isActive
                    ? 'text-primary after:block'
                    : 'text-secondary after:hidden',
                )
              }
            >
              Home
            </NavLink>
          </li>

          <li className="flex self-stretch">
            <NavLink
              to="phones"
              className={({ isActive }) =>
                cn(
                  'header-nav-link',
                  isActive
                    ? 'text-primary after:block'
                    : 'text-secondary after:hidden',
                )
              }
            >
              Phones
            </NavLink>
          </li>

          <li className="flex self-stretch">
            <NavLink
              to="tablets"
              className={({ isActive }) =>
                cn(
                  'header-nav-link',
                  isActive
                    ? 'text-primary after:block'
                    : 'text-secondary after:hidden',
                )
              }
            >
              Tablets
            </NavLink>
          </li>

          <li className="flex self-stretch">
            <NavLink
              to="accessories"
              className={({ isActive }) =>
                cn('header-nav-link', {
                  'text-primary after:block': isActive,
                  'text-secondary after:hidden': !isActive,
                })
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="hidden md:flex md:justify-end md:grow">
        <NavLink
          to="favourites"
          className="p-4 lg:p-6 aspect-square shadow-left shadow-elements hover:bg-hover-bg transition"
        >
          <div className="relative aspect-square">
            <Favourites className="w-full h-full fill-primary" />
            {false && <div className="header-button-counter">1</div>}
          </div>
        </NavLink>

        <NavLink
          to="cart"
          className="p-[16px] lg:p-[24px] aspect-square shadow-left shadow-elements hover:bg-hover-bg transition"
        >
          <div className="relative aspect-square">
            <Cart className="fill-primary" />
            {false && <div className="header-button-counter">1</div>}
          </div>
        </NavLink>
      </div>

      <div className="flex justify-end grow md:hidden">
        <NavLink
          to="menu"
          className="p-[16px] aspect-square shadow-left shadow-elements"
        >
          <Menu className="fill-primary" />
        </NavLink>
      </div>
    </header>
  );
};
