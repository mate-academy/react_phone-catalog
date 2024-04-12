import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import CrossImg from '../../images/icons/Cross.png';
import FavoritesIcon from '../../images/icons/Favourites (Heart Like).svg';
import CardIcon from '../../images/icons/Shopping bag (Cart).svg';

export const BurgerMenu = () => {
  const navLinks = [
    { value: 'HOME', hreaf: '/home' },
    { value: 'PHONES', hreaf: '/phones' },
    { value: 'TABLETS', hreaf: '/tablets' },
    { value: 'ACCESSORIES', hreaf: '/accessories' },
  ];

  const location = useLocation();
  const cartLocation = location.pathname.includes('cart');
  const favoritesLocation = location.pathname.includes('favorites');

  const [isActive, setIsActive] = useState(false);

  const toggleBurgerMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive === true) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isActive]);

  return (
    <>
      {isActive ? (
        <button
          className="burgerMenuButton--cross"
          type="button"
          aria-label="Burger menu"
          onClick={toggleBurgerMenu}
        >
          <img
            src={CrossImg}
            alt="close burger menu"
          // className="burgerMenuButton__img"
          />
        </button>
      ) : (
        <button
          className="burgerMenuButton"
          type="button"
          aria-label="Burger menu"
          onClick={toggleBurgerMenu}
        >
          <span className="burgerMenuButton__span" />
        </button>
      )}
      {/* <button
        className="burgerMenuButton"
        type="button"
        aria-label="Burger menu"
        onClick={toggleBurgerMenu}
      >
        <span className="burgerMenuButton__span" />
      </button> */}

      <div className={classNames(
        'burgerMenu',
        { 'burgerMenu--active': isActive },
      )}
      >
        <div className="burgerMenu__content">
          <ul>
            {navLinks.map(item => (
              <li className="burgerMenu__navItem" key={item.value}>
                <Link
                  to={item.hreaf}
                  onClick={() => setIsActive(false)}
                >
                  <p
                    className={classNames(
                      'burgerMenu__navLink',
                      { 'is-active': location.pathname.includes(`${item.hreaf}`) },
                    )}
                  >
                    {item.value}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="burgerMenu__content__footer">
            <Link
              to="/favorites"
              className={classNames(
                'burgerMenu__content__footerBtn',
                {
                  'burgerMenu__content__footerBtn--is-active':
                    favoritesLocation,
                },
              )}
              onClick={() => setIsActive(false)}
            >
              <button type="button">
                <img src={FavoritesIcon} alt="favorite icon" />
              </button>
            </Link>

            <Link
              to="/cart"
              className={classNames(
                'burgerMenu__content__footerBtn',
                'burgerMenu__content__footerBtn--left',
                {
                  'burgerMenu__content__footerBtn--is-active':
                  cartLocation,
                },
              )}
              onClick={() => setIsActive(false)}
            >
              <button
                type="button"

              >
                <img src={CardIcon} alt="favorite icon" />
              </button>
            </Link>

          </div>
        </div>

      </div>
    </>
  );
};
