import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Header.scss';
import '../../styles/main.scss';

export const Header: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  return (
    <>
      <header id="header">
        <nav className="header-nav">
          <Link to="/" className="header-nav__item">
            <img src="./icons/logo.svg" alt="logo" />
          </Link>

          <div
            onClick={() => setIsMenuVisible(true)}
            className="header-nav__item header-nav__burger"
          >
            <img src="./icons/burger.svg" alt="Open menu button" />
          </div>
        </nav>
      </header>

      {isMenuVisible && (
        <section className="menu">
          <div className="menu-top menu__top">
            <div className="menu-top__strip-wrapper">
              <nav className="menu-top-strip menu-top__strip">
                <Link className="menu-top-strip__logo" to="/">
                  <img src="./icons/logo.svg" alt="nice gadgets logo" />
                </Link>
                <button
                  onClick={() => setIsMenuVisible(false)}
                  className="menu-top-strip__close"
                >
                  <img src="./icons/close-16.svg" alt="close icon" />
                </button>
              </nav>
            </div>

            <nav className="menu-category-nav menu-top__nav">
              <Link className="menu-category-nav__link" to="/">
                Home
              </Link>
              <Link className="menu-category-nav__link" to="/phones">
                Phones
              </Link>
              <Link className="menu-category-nav__link" to="tablets">
                Tablets
              </Link>
              <Link className="menu-category-nav__link" to="accessories">
                Accessories
              </Link>
            </nav>
          </div>

          {/* 64px height of top flex-grow: 1 */}
          <div className="menu-bottom menu__bottom">
            <button className="menu-bottom__wishlist menu-bottom__button">
              <img src="./icons/heart-black.svg" alt="heart icon" />
            </button>
            <button className="menu-bottom__cart menu-bottom__button">
              <img src="./icons/cart.svg" alt="cart icon" />
            </button>
          </div>
        </section>
      )}
    </>
  );
};
