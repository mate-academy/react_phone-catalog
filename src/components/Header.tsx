import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import { cartSelectors } from '../selectors/cartSelectors';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import Logo from '/src/assets/logo.svg?react';
import Menu from '/src/assets/icons/menu.svg?react';
import Cart from '/src/assets/icons/cart.svg?react';
import Favourites from '/src/assets/icons/favourites.svg?react';
import type { FC } from 'react';

const nav = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Phones',
    href: '/phones',
  },
  {
    title: 'Tablets',
    href: '/tablets',
  },
  {
    title: 'Accessories',
    href: '/accessories',
  },
];

export const Header: FC = () => {
  const cartCount = useSelector(cartSelectors.selectAll).length;
  const favouritesCount = useSelector(favouritesSelectors.selectAll).length;

  return (
    <header className="fixed top-0 right-0 left-0 flex h-12 gap-4 bg-white z-1 shadow-down shadow-elements xl:h-16 xl:gap-6">
      <NavLink to="/" className="flex items-center px-4 xl:px-6">
        <Logo className="h-5.5 xl:h-7" />
      </NavLink>

      <nav className="hidden sm:block">
        <ul className="flex h-full items-center gap-8 xl:gap-16">
          {nav.map(({ title, href }) => (
            <li key={title} className="flex self-stretch">
              <NavLink
                to={href}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center hover:text-primary font-bold text-[12px] leading-2.75 tracking-[0.04em] uppercase transition after:content-[''] after:absolute after:bottom-0 after:h-[3px] after:w-full after:bg-primary",
                    {
                      'text-primary after:block': isActive,
                      'text-secondary after:hidden': !isActive,
                    },
                  )
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden sm:flex sm:grow sm:justify-end">
        <NavLink
          to="favourites"
          className="aspect-square p-4 transition shadow-left shadow-elements hover:bg-hover-bg xl:p-6"
        >
          <div className="relative aspect-square">
            <Favourites className="h-full w-full fill-primary" />
            {favouritesCount > 0 && (
              <div className="absolute flex items-center justify-center rounded-full border border-white top-[-6px] right-[-6px] size-[14px] bg-red">
                <span className="text-center font-semibold leading-none tracking-normal text-white text-[9px]">
                  {favouritesCount}
                </span>
              </div>
            )}
          </div>
        </NavLink>

        <NavLink
          to="cart"
          className="aspect-square transition p-4 shadow-left shadow-elements hover:bg-hover-bg xl:p-6"
        >
          <div className="relative aspect-square">
            <Cart className="fill-primary" />
            {cartCount > 0 && (
              <div className="absolute flex items-center justify-center rounded-full border border-white top-[-6px] right-[-6px] size-[14px] bg-red">
                <span className="text-center font-semibold leading-none tracking-normal text-white text-[9px]">
                  {cartCount}
                </span>
              </div>
            )}
          </div>
        </NavLink>
      </div>

      <div className="flex grow justify-end sm:hidden">
        <NavLink
          to="menu"
          className="aspect-square p-4 shadow-left shadow-elements"
        >
          <Menu className="fill-primary" />
        </NavLink>
      </div>
    </header>
  );
};
