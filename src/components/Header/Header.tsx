import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Navigation } from '../Navigation';
import './Header.scss';
import { Search } from '../Search';
import { ActionLink } from '../ActionLink/ActionLink';
import { CART, FAVORITES, TABLET_WIDTH } from '../../helpers/constants';

export const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const isMobile = !useMediaQuery({ minWidth: TABLET_WIDTH });

  const menuRef = useRef<HTMLElement>(null);

  const handleMenuLinkClick = () => {
    setIsMenuVisible(false);
    document.body.classList.remove('app--with-menu');
  };

  useEffect(() => {
    const menuElement = menuRef.current;

    if (menuElement) {
      if (isMenuVisible) {
        menuElement.classList.add('header__menu--visible');
      } else {
        menuElement.classList.remove('header__menu--visible');
      }
    }
  }, [isMenuVisible]);

  const handleMenuClick = useCallback(() => {
    setIsMenuVisible(prev => !prev);

    if (!isMenuVisible) {
      document.body.classList.add('app--with-menu');
    } else {
      document.body.classList.remove('app--with-menu');
    }
  }, [isMenuVisible]);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__top">
          <Link
            to="/home"
            className="header__logo"
            onClick={isMenuVisible ? handleMenuLinkClick : () => {}}
          >
            <img
              src="./img/icons/logo.svg"
              alt="LOGO"
              className="header__logo-image"
            />
          </Link>

          {!isMobile && <Navigation />}
          <div className="header__actions">
            {!isMenuVisible && <Search />}

            {!isMobile && (
              <>
                <ActionLink action={FAVORITES} />
                <ActionLink action={CART} />
              </>
            )}

            <button
              type="button"
              className="header__menu-button"
              onClick={handleMenuClick}
            >
              <div className={cn('icon', {
                'icon--cross': isMenuVisible,
                'icon--menu': !isMenuVisible,
              })}
              />
            </button>
          </div>
        </div>

        {isMobile && (
          <div className="container">
            <nav className="header__menu" ref={menuRef}>
              <Navigation
                handleClick={handleMenuLinkClick}
              />

              <div className="header__menu-actions">
                <ActionLink
                  action={FAVORITES}
                  handleClick={handleMenuLinkClick}
                />
                <ActionLink
                  action={CART}
                  handleClick={handleMenuLinkClick}
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
