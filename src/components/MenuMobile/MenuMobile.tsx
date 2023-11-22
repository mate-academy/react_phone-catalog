import { FC, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { navigation } from '../../utils/navigation';
import { Logo } from '../Logo/Logo';
import { Button } from '../Button/Button';
import { Favorites } from '../Favorites/Favorites';
import { Cart } from '../Cart/Cart';
import { PhoneCatalogContext } from '../../context/PhoneCatalogContext';

import './MenuMobile.scss';

export const MenuMobile: FC = () => {
  const { isMenuClicked, setIsMenuClicked } = useContext(PhoneCatalogContext);

  useEffect(() => {
    document.body.style.overflowY = isMenuClicked ? 'hidden' : 'visible';

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuClicked) {
        setIsMenuClicked(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuClicked]);

  return (
    <nav
      className={classNames(
        'menu-mobile',
        { 'menu-mobile--opened': isMenuClicked },
      )}
    >
      <div className="menu-mobile__top">
        <Logo />

        <Button
          className="close-menu"
          iconType="remove"
          onClick={() => setIsMenuClicked(false)}
        />
      </div>

      <div className="menu-mobile__content">
        <ul className="menu-mobile__list">
          {navigation.map(({ name, to }) => (
            <li
              key={name}
              className="menu-mobile__item"
            >
              <NavLink
                className={({ isActive }) => classNames('menu-mobile__link', {
                  'menu-mobile__link--active': isActive,
                })}
                to={to}
                onClick={() => setIsMenuClicked(false)}
              >
                {name}
              </NavLink>
            </li>
          ))}

        </ul>

        <div className="menu-mobile__icons">
          <Favorites />
          <Cart />
        </div>
      </div>
    </nav>
  );
};
