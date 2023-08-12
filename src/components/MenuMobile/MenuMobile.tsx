import { FC, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { navigation } from '../../utils/navigation';
import { Logo } from '../Logo/Logo';
import { Icon } from '../Icon/Icon';

import './MenuMobile.scss';
import { Button } from '../Button/Button';

type Props = {
  isMenuClicked: boolean,
  setIsMenuClicked: (isMenuClicked: boolean) => void;
};

export const MenuMobile: FC<Props> = ({ isMenuClicked, setIsMenuClicked }) => {
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
        <Logo onMenuClicked={setIsMenuClicked} />

        <Button
          content="icon"
          iconType="close"
          className="close-menu"
          event={() => setIsMenuClicked(false)}
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
          <Link
            className="menu-mobile__icon"
            to="/favorites"
            onClick={() => setIsMenuClicked(false)}
          >
            <Icon type="favorites" />
          </Link>
          <Link
            className="menu-mobile__icon"
            to="/shopping-cart"
            onClick={() => setIsMenuClicked(false)}
          >
            <Icon type="cart" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
