import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import { FC, useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'clsx';
import { MenuContext } from '../../../contexts/MenuContext';
import { MENU_NAVIGATION as NAVIGATION } from '../constants/menu_navigation';
import { cartSelectors } from '../../../../CartPage/selectors/cartSelectors';
import { favouritesSelectors } from '../../../../FavouritesPage/selectors/favouritesSelectors';
import { Button } from '../../../components/ui/Button/Button';
import { IconWithBadge } from '../../../components/ui/IconWithBadge';
import Logo from '/src/images/logo.svg?react';
import Close from '/src/images/icons/close.svg?react';

type Props = {
  className?: string;
};

export const Menu: FC<Props> = ({ className }) => {
  const { isMenuOpen, closeMenu } = useContext(MenuContext);
  const location = useLocation();
  const cartCount = useSelector(cartSelectors.selectTotalQuantity);
  const favouritesCount = useSelector(favouritesSelectors.selectTotal);
  const t = useTranslations('nav');

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
  }, [closeMenu, location]);

  return (
    <aside
      className={cn(
        'dark:bg-d-black flex flex-col bg-white',
        {
          'pointer-events-all overflow-auto opacity-100': isMenuOpen,
          'pointer-events-none opacity-0': !isMenuOpen,
        },
        className,
      )}
    >
      <div className="shadow-bottom shadow-elements dark:shadow-d-surface2 dark:bg-d-black flex shrink-0 grow-0 basis-(--header-height-xs) justify-between gap-4 bg-white">
        <NavLink
          to="/"
          className="flex flex-[0_0_auto] items-center px-4 xl:px-6"
        >
          <Logo className="fill-primary dark:fill-d-white h-5.5 xl:h-7" />
        </NavLink>

        <Button
          onClick={closeMenu}
          className="shadow-left shadow-elements dark:shadow-d-surface2 aspect-square p-4"
        >
          <Close className="fill-primary dark:fill-d-white" />
        </Button>
      </div>
      <div className="flex-[1_1_auto]">
        <div className="container">
          <nav className="my-6">
            <ul className="flex flex-col items-center gap-4">
              {NAVIGATION.map(({ title, href }) => (
                <li key={title} className="flex">
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      cn(
                        'text-uppercase hover:text-primary dark:hover:text-d-white after:bg-primary dark:after:bg-d-white relative flex items-center justify-center py-2 transition after:absolute after:bottom-0 after:h-0.75 after:w-full after:content-[""]',
                        {
                          'text-primary dark:text-d-white after:block':
                            isActive,
                          'text-secondary dark:text-d-secondary after:hidden':
                            !isActive,
                        },
                      )
                    }
                  >
                    {t(title.toLowerCase())}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="shadow-top shadow-elements dark:shadow-d-surface2 flex flex-[0_0_auto]">
        <NavLink
          to="favourites"
          className="shadow-left shadow-elements flex flex-[1_1_50%] items-center justify-center py-6"
        >
          <IconWithBadge variant="favourites" badgeContent={favouritesCount} />
        </NavLink>

        <NavLink
          to="cart"
          className="shadow-left shadow-elements dark:shadow-d-surface2 flex flex-[1_1_50%] items-center justify-center py-6"
        >
          <IconWithBadge variant="cart" badgeContent={cartCount} />
        </NavLink>
      </div>
    </aside>
  );
};
