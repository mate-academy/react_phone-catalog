import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import cn from 'clsx';
import { cartSelectors } from '../selectors/cartSelectors';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import { HEADER_NAVIGATION as NAVIGATION } from '../constants';
import Logo from '/src/images/logo.svg?react';
import Menu from '/src/images/icons/menu.svg?react';
import Close from '/src/images/icons/close.svg?react';
import { FC, useContext } from 'react';
import { MenuContext } from '../contexts/MenuContext';
import { Button } from './Button';
import { IconWithBadge } from './IconWithBadge';
import { Toggle } from './Toggle';

type Props = {
  className?: string;
};

export const Header: FC<Props> = ({ className }) => {
  const cartCount = useSelector(cartSelectors.selectTotalQuantity);
  const favouritesCount = useSelector(favouritesSelectors.selectTotal);
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);

  return (
    <header
      className={cn(
        'shadow-bottom shadow-elements dark:shadow-d-surface2 dark:bg-d-black flex gap-4 bg-white xl:gap-6',
        className,
      )}
    >
      <NavLink to="/" className="flex items-center px-4 xl:px-6">
        <Logo className="fill-primary dark:fill-d-white h-5.5 xl:h-7" />
      </NavLink>

      <nav className="hidden sm:block">
        <ul className="flex h-full gap-8 xl:gap-16">
          {NAVIGATION.map(({ title, href }) => (
            <li key={title} className="flex">
              <NavLink
                to={href}
                className={({ isActive }) =>
                  cn(
                    'text-uppercase hover:text-primary dark:hover:text-d-white after:bg-primary dark:after:bg-d-white relative flex items-center justify-center transition after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:w-full after:content-[""]',
                    isActive
                      ? 'text-primary dark:text-d-white after:block'
                      : 'text-secondary dark:text-d-secondary after:hidden',
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
        <Toggle />
        <NavLink
          to="favourites"
          className={({ isActive }) =>
            cn(
              'shadow-left shadow-elements dark:shadow-d-surface2 hover:bg-hover-bg dark:hover:bg-d-surface1 after:bg-primary dark:after:bg-d-white relative aspect-square p-4 transition after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:w-full after:content-[""] xl:p-6',
              isActive ? 'after:block' : 'after:hidden',
            )
          }
        >
          <IconWithBadge variant="favourites" badgeContent={favouritesCount} />
        </NavLink>

        <NavLink
          to="cart"
          className={({ isActive }) =>
            cn(
              'shadow-left shadow-elements dark:shadow-d-surface2 hover:bg-hover-bg dark:hover:bg-d-surface1 after:bg-primary dark:after:bg-d-white relative aspect-square p-4 transition after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:w-full after:content-[""] xl:p-6',
              isActive ? 'after:block' : 'after:hidden',
            )
          }
        >
          <IconWithBadge variant="cart" badgeContent={cartCount} />
        </NavLink>
      </div>

      <div className="flex grow justify-end sm:hidden">
        <Button
          onClick={toggleMenu}
          className="shadow-left shadow-elements dark:shadow-d-surface2 aspect-square p-4"
        >
          {isMenuOpen ? (
            <Close className="fill-primary dark:fill-d-white" />
          ) : (
            <Menu className="fill-primary dark:fill-d-white" />
          )}
        </Button>
      </div>
    </header>
  );
};
