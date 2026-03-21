import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'clsx';
import { MenuContext } from '../../../contexts/MenuContext';
import { HEADER_NAVIGATION as NAVIGATION } from '../constants/header_navigation';
import { cartSelectors } from '../../../../CartPage/selectors/cartSelectors';
import { favouritesSelectors } from '../../../../FavouritesPage/selectors/favouritesSelectors';
import { Search } from './Search';
import { Button } from '../../../components/ui/Button/Button';
import { IconWithBadge } from '../../../components/ui/IconWithBadge';
import Logo from '/src/images/logo.svg?react';
import MenuIcon from '/src/images/icons/menu.svg?react';

type Props = {
  className?: string;
};

export const Header: FC<Props> = ({ className }) => {
  const cartCount = useSelector(cartSelectors.selectTotalQuantity);
  const favouritesCount = useSelector(favouritesSelectors.selectTotal);
  const { openMenu } = useContext(MenuContext);
  const { pathname } = useLocation();
  const t = useTranslations('nav');

  const isSearchVisible = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favourites',
  ].includes(pathname);

  return (
    <header
      className={cn(
        'shadow-bottom shadow-elements dark:shadow-d-surface2 dark:bg-d-black flex gap-4 bg-white xl:gap-6',
        className,
      )}
    >
      <NavLink
        to="/"
        className="flex flex-[0_0_auto] items-center px-4 xl:px-6"
      >
        <Logo className="fill-primary dark:fill-d-white h-5.5 xl:h-7" />
      </NavLink>

      <nav className="hidden lg:block">
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
                {t(title.toLowerCase())}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex grow justify-end">
        {isSearchVisible && (
          <Search className="shadow-left shadow-elements dark:shadow-d-surface2 hover:bg-hover-bg dark:hover:bg-d-surface1 w-full transition" />
        )}

        <div className="hidden lg:flex">
          <NavLink
            to="favourites"
            className={({ isActive }) =>
              cn(
                'shadow-left shadow-elements dark:shadow-d-surface2 hover:bg-hover-bg dark:hover:bg-d-surface1 after:bg-primary dark:after:bg-d-white relative aspect-square p-4 transition after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.75 after:w-full after:content-[""] xl:p-6',
                isActive ? 'after:block' : 'after:hidden',
              )
            }
          >
            <IconWithBadge
              variant="favourites"
              badgeContent={favouritesCount}
            />
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

        <div className="flex lg:hidden">
          <Button
            onClick={openMenu}
            className="shadow-left shadow-elements dark:shadow-d-surface2 aspect-square p-4"
          >
            <MenuIcon className="fill-primary dark:fill-d-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};
