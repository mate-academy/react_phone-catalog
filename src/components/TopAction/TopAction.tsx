import classNames from 'classnames';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CatalogContext } from '../../CatalogContext';

export const TopAction = () => {
  const { menuStatus, setMenuStatus } = useContext(CatalogContext);
  const toggleMenuBtn = () => {
    setMenuStatus(!menuStatus);
  };

  const hendleClickToHome = () => {
    setMenuStatus(false);
    localStorage.setItem('scrollPosition', '0');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="header__top-action top-action">
      <Link
        to="/"
        className="top-action__item top-action__logo-link"
        onClick={hendleClickToHome}
      >
        <img
          src={`../img/logo.svg`}
          alt="logo"
          className="top-action__logo-image"
        />
      </Link>
      <button
        className={classNames(
          'top-action__item',
          'icon top-action__menu-button top-action__menu-button--menu-opener',
          {
            'icon--opener': !menuStatus,
            'icon--closer': menuStatus,
          },
        )}
        onClick={toggleMenuBtn}
      ></button>
    </div>
  );
};
