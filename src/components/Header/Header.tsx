import { useLocation, useParams } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import classNames from 'classnames';

import './header.scss';

import { useCloseClick } from '../../customHooks/useCloseClick';
import { PageNavLink } from '../UI/PageNavLink';
import { Logo } from '../UI/Logo';
import { Search } from '../UI/Search';
import { StoreContext } from '../../contexts/StoreContext';
import { Sticker } from '../UI/Sticker';

export const Header = () => {
  const [ref, isMobileMenuOpen, setIsMobileMenuOpen] = useCloseClick(false);
  const { itemId } = useParams();
  const { pathname, search } = useLocation();
  const currentPath = pathname.split('/')[1];
  const searchVisiblePaths = useMemo(() => [
    'phones',
    'tablets',
    'accessories',
    'favourites',
  ], []);
  const isSearchVisible = searchVisiblePaths.includes(currentPath) && !itemId;
  const { cartItemsNumber, favouriteIds } = useContext(StoreContext);

  return (
    <header className="header">
      <div className="header__left">
        <Logo parentClass="header__logo" />

        <nav
          className={classNames(
            'header__nav',
            { 'header__nav--active': isMobileMenuOpen },
          )}
        >
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <PageNavLink
                path="/"
                linkType="nav"
                text="HOME"
              />
            </li>

            <li className="header__nav-item">
              <PageNavLink
                path="phones"
                linkType="nav"
                text="PHONES"
              />
            </li>

            <li className="header__nav-item">
              <PageNavLink
                path="/tablets"
                linkType="nav"
                text="TABLETS"
              />
            </li>

            <li className="header__nav-item">
              <PageNavLink
                path="accessories"
                linkType="nav"
                text="ACCESSORIES"
              />
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__right">
        {isSearchVisible && (
          <Search catPath={currentPath} />
        )}

        <div className="header__tile">
          <PageNavLink path="favourites" linkType="tile">
            <img
              src="./img/icons/Favourites.svg"
              alt="Favourites"
              className="header__tile-image"
            />

            {favouriteIds.length > 0 && (
              <Sticker
                className="header__tile-sticker"
                num={favouriteIds.length}
              />
            )}
          </PageNavLink>
        </div>

        <div className="header__tile">
          <PageNavLink
            path="cart"
            linkType="tile"
            goBackLocation={{ pathname, search }}
          >
            <img
              src="./img/icons/Cart.svg"
              alt="Cart"
              className="header__tile-image"
            />

            {cartItemsNumber > 0 && (
              <Sticker
                className="header__tile-sticker"
                num={cartItemsNumber}
              />
            )}
          </PageNavLink>
        </div>

        {isMobileMenuOpen ? (
          <button
            ref={ref}
            type="button"
            className="header__menu-button"
          >
            <img
              src="./img/icons/Close.svg"
              alt="Menu"
              className="header__tile-image"
            />
          </button>
        ) : (
          <button
            type="button"
            className="header__menu-button"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <img
              src="./img/icons/Burger.svg"
              alt="Menu"
              className="header__tile-image"
            />
          </button>
        )}
      </div>

    </header>
  );
};
