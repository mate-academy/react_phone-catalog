import { FC, useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuContext } from '../contexts/MenuContext';
import { HEADER_NAVIGATION as NAVIGATION } from '../constants';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import { cartSelectors } from '../selectors/cartSelectors';
import { favouritesSelectors } from '../selectors/favouritesSelectors';
import { IconWithBadge } from './IconWithBadge';

type Props = {
  className?: string;
};

export const Menu: FC<Props> = ({ className }) => {
  const { isMenuOpen, closeMenu } = useContext(MenuContext);
  const location = useLocation();
  const cartCount = useSelector(cartSelectors.selectTotalQuantity);
  const favouritesCount = useSelector(favouritesSelectors.selectTotal);

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
        'dark:bg-d-black bg-white',
        {
          'pointer-events-all overflow-auto opacity-100': isMenuOpen,
          'pointer-events-none opacity-0': !isMenuOpen,
        },
        className,
      )}
    >
      <div className="flex h-full flex-col justify-between">
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
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="shadow-top shadow-elements dark:shadow-d-surface2 flex">
          <NavLink
            to="favourites"
            className="shadow-left shadow-elements flex flex-[1_1_50%] items-center justify-center py-6"
          >
            <IconWithBadge
              variant="favourites"
              badgeContent={favouritesCount}
            />
          </NavLink>

          <NavLink
            to="cart"
            className="shadow-left shadow-elements dark:shadow-d-surface2 flex flex-[1_1_50%] items-center justify-center py-6"
          >
            <IconWithBadge variant="cart" badgeContent={cartCount} />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
