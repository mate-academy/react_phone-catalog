import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useOpenMenu from '../../hooks/useOpenMenu';
import './Header.scss';
import '../../styles/main.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, hideMenu, showMenu] = useOpenMenu();

  useEffect(() => {
    if (isMenuOpen) {
      (document.querySelector('body') as HTMLBodyElement).style.overflow =
        'hidden';
    } else {
      (document.querySelector('body') as HTMLBodyElement).style.overflow =
        'scroll';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="header" id="header">
        <nav className="header-nav">
          <Link to="/" className="header-nav__item">
            <img src="./icons/logo.svg" alt="logo" />
          </Link>

          <div
            onClick={showMenu}
            className="header-nav__item header-nav__burger"
          >
            <img src="./icons/burger.svg" alt="Open menu button" />
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <section className="menu">
          <div className="menu-top menu__top">
            <div className="menu-top__strip-wrapper">
              <nav className="menu-top-strip menu-top__strip">
                <Link
                  className="menu-top-strip__logo"
                  to="/"
                  onClick={hideMenu}
                >
                  <img src="./icons/logo.svg" alt="nice gadgets logo" />
                </Link>

                <button onClick={hideMenu} className="menu-top-strip__close">
                  <img src="./icons/close-16.svg" alt="close icon" />
                </button>
              </nav>
            </div>

            <nav className="menu-category-nav menu-top__nav">
              <Link
                className="menu-category-nav__link"
                to="/"
                onClick={hideMenu}
              >
                Home
              </Link>
              <Link
                className="menu-category-nav__link"
                to="/phones"
                onClick={hideMenu}
              >
                Phones
              </Link>
              <Link
                className="menu-category-nav__link"
                to="tablets"
                onClick={hideMenu}
              >
                Tablets
              </Link>
              <Link
                className="menu-category-nav__link"
                to="accessories"
                onClick={hideMenu}
              >
                Accessories
              </Link>
            </nav>
          </div>

          {/* 64px height of top flex-grow: 1 */}
          <div className="menu-bottom menu__bottom">
            <Link
              to={'/favorites'}
              className="menu-bottom__wishlist menu-bottom__button"
              onClick={hideMenu}
            >
              <img src="./icons/heart-black.svg" alt="heart icon" />
            </Link>
            <Link
              to={'/cart'}
              className="menu-bottom__cart menu-bottom__button"
              onClick={hideMenu}
            >
              <img src="./icons/cart.svg" alt="cart icon" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
};