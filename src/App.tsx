import { Link, Outlet } from 'react-router-dom';
import './styles/_reset.scss';
import './App.scss';
import './styles/main.scss';
import './styles/footer.scss';
import { Navigations } from './components/Navigations/Navigations';
import { useEffect, useState } from 'react';
import './styles/header.scss';
import classNames from 'classnames';
import { Loader } from './components/Loader/Loader';
import logo from './images/Logo.png';
import { useProducts } from './context/ProductsContext';

export const AppLayout = () => {
  const { loading, error } = useProducts();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hangelChangeBurger = (item: boolean) => {
    if (isOpen === false) {
      return setIsOpen(item);
    }

    return setIsOpen(false);
  };

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="App">
      <header className="header">
        <div className="header__logo">
          <Link className="header__logo__link" to="/">
            <img
              className="header__logo__link--item"
              src={logo}
              alt="LogoSticker"
            />
          </Link>
        </div>
        <div className="header__navigation">
          <Navigations />
        </div>
        <button
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => hangelChangeBurger(true)}
          className={classNames(
            '',
            { 'header__burge-menu--item': isOpen === false },
            { 'burger-menu--active': isOpen === true },
          )}
        />
      </header>

      <div
        className={classNames(
          'mobile-menu',

          { 'mobile-men--active': isOpen === true },
        )}
      >
        <Navigations />
      </div>

      <main className="App__main">
        <div className="wrapper">
          {loading ? <Loader /> : error ? <p>{error.message}</p> : <Outlet />}
        </div>
      </main>
      <footer className="footer">
        <div className="header__logo">
          <Link className="header__logo__link" to="/">
            <img
              className="header__logo__link--item"
              src={logo}
              alt="LogoSticker"
            />
          </Link>
        </div>
        <ul className="footer__list">
          <li className="footer__list__item">
            <Link to="/Github" className="footer__list__item--link">
              Github
            </Link>
          </li>
          <li className="footer__list__item">
            <Link className="footer__list__item--link" to="/Contacts">
              Contacts
            </Link>
          </li>
          <li className="footer__list__item">
            <Link to="/rights" className="footer__list__item--link">
              rights
            </Link>
          </li>
        </ul>
        <div className="footer__back">
          <button
            type="button"
            className="footer__back--link"
            onClick={e => {
              e.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            Back to top <span className="footer__back--link--arrow">^</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
