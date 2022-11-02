import './Header.scss';
import '../../scss/blocks/nav.scss';
import '../../scss/blocks/hamburger.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink';
import logo from '../../img/LOGO.svg';
import { Search } from '../Search/Search';

export const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isActiveMobile, setIsActiveMobile] = useState(false);

  useEffect(() => {
    if (!isActiveMobile) {
      return;
    }

    const handleDocumentClick = () => {
      setIsActiveMobile(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isActiveMobile]);

  return (
    <header className="header" id="header">
      <div className="header__left">
        <div
          className="header__hamburger hamburger"
          onClick={() => {
            setIsActiveMobile(current => !current);
          }}
          aria-hidden="true"
        >
          <div className="hamburger__lines">
            <span className={classNames(
              'hamburger__line',
              'hamburger__line1',
              { 'hamburger__line1--active': isActiveMobile },
            )}
            />
            <span className={classNames(
              'hamburger__line',
              'hamburger__line2',
              { 'hamburger__line2--active': isActiveMobile },
            )}
            />
            <span className={classNames(
              'hamburger__line',
              'hamburger__line3',
              { 'hamburger__line3--active': isActiveMobile },
            )}
            />
          </div>
        </div>
        <div className="logo header__logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav
          className={classNames(
            'nav',
            { nav__mobile: isActiveMobile },
          )}
        >
          <ul className="nav__pages">
            <li className="nav__page">
              <PageNavLink to="//" text="Home" />
            </li>
            <li className="nav__page">
              <PageNavLink to="phones" text="Phones" />
            </li>
            <li className="nav__page">
              <PageNavLink to="tablets" text="Tablets" />
            </li>
            <li className="nav__page">
              <PageNavLink to="accessories" text="Accessories" />
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__right">
        {(currentPath === '/phones'
            || currentPath === '/tablets'
            || currentPath === '/accessories'
            || currentPath === '/favorites'
        ) && (
          <Search />
        )}
        <div className="header__buttons">
          <PageNavLink to="favorites" text="" button icon="heart" />
          <PageNavLink to="cart" text="" button icon="cart" />
        </div>
      </div>
    </header>
  );
};
