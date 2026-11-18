/* eslint-disable max-len */

import { Link, NavLink } from 'react-router-dom';
import './Aside.scss';
import { useEffect, useState } from 'react';
import { useFavourites } from '../../../context/FavouritesContext';
import { useCart } from '../../../context/CartContext';

export const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favourites } = useFavourites();
  const { cart } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className="burger-menu">
        <div className="burger-menu__button">
          {!isOpen && (
            <svg
              onClick={() => setIsOpen(true)}
              className="burger-menu__icon-open burger-menu__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
            >
              <path
                d="M0 0.75C0 0.335786 0.391751 0 0.875 0H13.125C13.6082 0 14 0.335786 14 0.75C14 1.16421 13.6082 1.5 13.125 1.5H0.875C0.391751 1.5 0 1.16421 0 0.75Z"
                fill="#F1F2F9"
              />
              <path
                d="M0 4.25C0 3.83579 0.391751 3.5 0.875 3.5H13.125C13.6082 3.5 14 3.83579 14 4.25C14 4.66421 13.6082 5 13.125 5H0.875C0.391751 5 0 4.66421 0 4.25Z"
                fill="#F1F2F9"
              />
              <path
                d="M0.875 7C0.391751 7 0 7.33579 0 7.75C0 8.16421 0.391751 8.5 0.875 8.5H13.125C13.6082 8.5 14 8.16421 14 7.75C14 7.33579 13.6082 7 13.125 7H0.875Z"
                fill="#F1F2F9"
              />
            </svg>
          )}
        </div>

        <nav
          className={`burger-menu__nav ${isOpen ? 'burger-menu__nav--is-open' : ''}`}
        >
          <div className="burger-menu__content">
            <div className="burger-menu__content--top">
              <Link
                to={'/'}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <img
                  className="burger-menu__content--top-logo"
                  src="img/Logo.png"
                  alt="NICE GADGETS"
                />
              </Link>
              <svg
                onClick={() => setIsOpen(false)}
                className="burger-menu__icon-close burger-menu__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M9.13807 1.13807C9.39842 0.877722 9.39842 0.455612 9.13807 0.195262C8.87772 -0.0650874 8.45561 -0.0650874 8.19526 0.195262L4.66667 3.72386L1.13807 0.195262C0.877722 -0.0650874 0.455612 -0.0650874 0.195262 0.195262C-0.0650874 0.455612 -0.0650874 0.877722 0.195262 1.13807L3.72386 4.66667L0.195262 8.19526C-0.0650874 8.45561 -0.0650874 8.87772 0.195262 9.13807C0.455612 9.39842 0.877722 9.39842 1.13807 9.13807L4.66667 5.60948L8.19526 9.13807C8.45561 9.39842 8.87772 9.39842 9.13807 9.13807C9.39842 8.87772 9.39842 8.45561 9.13807 8.19526L5.60948 4.66667L9.13807 1.13807Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  fill="#F1F2F9"
                />
              </svg>
            </div>

            <div className="burger-menu__content--main">
              <nav className="main__nav">
                <ul className="main__nav__list">
                  <li className="main__nav__item">
                    <NavLink
                      className="main__nav__link"
                      to={'/'}
                      end
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      home
                    </NavLink>
                  </li>
                  <li className="main__nav__item">
                    <NavLink
                      className="main__nav__link"
                      to={'/phones'}
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      phone
                    </NavLink>
                  </li>
                  <li className="main__nav__item">
                    <NavLink
                      className="main__nav__link"
                      to={'/tablets'}
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      tablets
                    </NavLink>
                  </li>
                  <li className="main__nav__item">
                    <NavLink
                      className="main__nav__link"
                      to={'/accessories'}
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        });
                      }}
                    >
                      accessories
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="burger-menu__content--bottom">
              <NavLink
                className="burger-menu__favourites"
                to={'favourites'}
                onClick={() => setIsOpen(false)}
              >
                <img
                  className="burger-menu__favourites__icon"
                  src="icons/Favourites.png"
                  alt="favourites"
                />
                {favourites.length > 0 && (
                  <span className="burger-menu__favourites__counter">
                    {favourites.length}
                  </span>
                )}
              </NavLink>
              <NavLink
                className="burger-menu__cart"
                to={'/cart'}
                onClick={() => setIsOpen(false)}
              >
                <img
                  className="burger-menu__cart__icon"
                  src="icons/Cart.png"
                  alt="cart"
                />
                {cart.length > 0 && (
                  <span className="burger-menu__cart__counter">
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
