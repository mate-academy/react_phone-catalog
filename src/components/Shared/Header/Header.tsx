import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { StateContext } from '../../../context/ItemProvider';
import { useContext, useState } from 'react';
import { Aside } from '../Aside/Aside';
import productsData from '../../../../public/api/products.json';

export const Header = () => {
  const { pathname } = useLocation();
  const match = matchPath('/product/:productId', pathname);
  const currentProductId = match?.params.productId;
  const currentProduct = currentProductId
    ? productsData.find(p => p.itemId === currentProductId)
    : null;
  const currentCategory = currentProduct?.category;

  const { totalCount, fav } = useContext(StateContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bodyElement = document.querySelector('.page');

  if (!bodyElement) {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    bodyElement.classList.toggle('aside-active');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = (categoryPath: string, categoryName: string) => {
    return ({ isActive }: { isActive: boolean }) => {
      const isCurrent = isActive || currentCategory === categoryName;

      return `header-left__nav ${isCurrent ? 'nav-active' : ''}`;
    };
  };

  return (
    <>
      <header className="header" id="page-top">
        <div className="header__content">
          <div className="header-left">
            <NavLink to="/" className="header-left__logo">
              <img src="./img/icons/Logo.svg" alt="Logo" />
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `header-left__nav ${isActive ? 'nav-active' : ''}`
              }
            >
              home
            </NavLink>
            <NavLink to="phones" className={getLinkClass('phones', 'phones')}>
              phones
            </NavLink>
            <NavLink
              to="tablets"
              className={getLinkClass('tablets', 'tablets')}
            >
              tablets
            </NavLink>
            <NavLink
              to="accessories"
              className={getLinkClass('accessories', 'accessories')}
            >
              accessories
            </NavLink>
          </div>
          <div className="header-right__icons">
            {fav.length > 0 ? (
              <NavLink
                to="favourites"
                className={({ isActive }) =>
                  `icon icon--favCount ${isActive ? 'cart-active' : ''}`
                }
              >
                <span className="icon--favCount--count">{fav.length}</span>
              </NavLink>
            ) : (
              <NavLink
                to="favourites"
                className={({ isActive }) =>
                  `icon icon--fav ${isActive ? 'cart-active' : ''}`
                }
              ></NavLink>
            )}

            {totalCount > 0 ? (
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `icon icon--cartCount ${isActive ? 'cart-active' : ''}`
                }
              >
                <span className="icon--cartCount--count">{totalCount}</span>
              </NavLink>
            ) : (
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  `icon icon--cart ${isActive ? 'cart-active' : ''}`
                }
              ></NavLink>
            )}
            <div className="header__right">
              <button
                type="button"
                className={`icon ${isMenuOpen ? 'icon--close' : 'icon--menu'}`}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              />
            </div>
          </div>
        </div>
      </header>
      <Aside isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};
