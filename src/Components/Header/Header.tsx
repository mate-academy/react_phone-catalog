import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { NavItems } from '../Navigation/Navigation';

const windowSize = window.innerWidth > 640;

export const Header = () => {
  const { menuOpened, onMenuOpened, inFavourites, inCart } =
    useContext(ProductContext);
  const [isDesktop, setIsDesktop] = useState(windowSize);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 640);
      if (window.innerWidth > 640) {
        onMenuOpened(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [onMenuOpened]);

  const toggleMenu = () => {
    if (windowSize) {
      onMenuOpened(false);
    }

    onMenuOpened(!menuOpened);
  };

  const handleLikeButton = () => {
    if (menuOpened) {
      onMenuOpened(false);
    }

    navigate('/favorites');
  };

  const handleCartButton = () => {
    if (menuOpened) {
      onMenuOpened(false);
    }

    navigate('/cart');
  };

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <Link to="/" className="header__logo"></Link>
          {<NavItems />}
        </div>

        <div className="header__buttons">
          <div
            className="header__buttons__container"
            onClick={handleLikeButton}
          >
            <a className="icon icon--favourites"></a>
            {!!inFavourites.length && (
              <div className="icon--favourites__number">
                <p className="icon--favourites__text">{inFavourites.length}</p>
              </div>
            )}
          </div>

          <div
            className="header__buttons__container"
            onClick={handleCartButton}
          >
            <a className="icon icon--cart"></a>
            {!!inCart.length && (
              <div className="icon--favourites__number">
                <p className="icon--favourites__text">{inCart.length}</p>
              </div>
            )}
          </div>
        </div>

        <div className="menu__button" onClick={toggleMenu}>
          <div className="menu__button__container">
            <a
              className={classNames(
                `icon ${menuOpened ? 'icon--close' : 'icon--menu'}`,
              )}
            ></a>
          </div>
        </div>
      </header>

      {menuOpened && !isDesktop && (
        <div className="overlay">
          <div className="overlay__content">
            <nav className="mobile-menu__nav">
              <NavItems />
            </nav>

            <div className="mobile-menu__footer">
              <div className="icon__container" onClick={handleLikeButton}>
                <a className="icon icon--favourites"></a>
                {!!inFavourites.length && (
                  <div className="icon--favourites__number">
                    <p className="icon--favourites__text">
                      {inFavourites.length}
                    </p>
                  </div>
                )}
              </div>
              <div className="icon__container">
                <a className="icon icon--cart"></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
