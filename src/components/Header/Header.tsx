import { useContext, useMemo, useState } from 'react';
// styles & images
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import LogoIcon from '../../images/icons/Logo.svg';
import FavoritesIcon from '../../images/icons/Favourites (Heart Like).svg';
import CardIcon from '../../images/icons/Shopping bag (Cart).svg';
import './header.scss';
import { Search } from '../Search';
import { FavoritesContext } from '../ContextProviders/ContextProviders';
import { useAppSelector } from '../../app/hooks';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { useWindowSize } from '../../hooks/useWindowSize';

export const Header = () => {
  const location = useLocation();

  const homeLocation = location.pathname.includes('home');
  const phonesLocation = location.pathname.includes('phones');
  const tabletsLocation = location.pathname.includes('tablets');
  const accessoriesLocation = location.pathname.includes('accessories');
  const cartLocation = location.pathname.includes('cart');
  const searchCondition = phonesLocation
    || tabletsLocation
    || accessoriesLocation;
  const [placeholderValue, setPlaceholderValue] = useState('');
  const { favorites } = useContext(FavoritesContext);
  const cart = useAppSelector(state => state.cart);
  const totalItemsInCart = cart.cartItems.length;

  const sliderWidth = useWindowSize();

  const shouldShowBurgerMenu
  = sliderWidth.width >= 320 && sliderWidth.width <= 639;

  useMemo(() => {
    switch (searchCondition) {
      case phonesLocation:
        return setPlaceholderValue('Search in phones...');
      case tabletsLocation:
        return setPlaceholderValue('Search in tablets...');
      case accessoriesLocation:
        return setPlaceholderValue('Search in accessories...');
      default:
        break;
    }

    return searchCondition;
  }, [searchCondition, phonesLocation, tabletsLocation, accessoriesLocation]);

  return (
    <header className={classNames(
      'header',
      { 'header--homePage': homeLocation },
    )}
    >
      <div className="nav-block">
        <Link to="/home">
          <div className="logo">
            <img src={LogoIcon} alt="Logo" className="logoImage" />
          </div>
        </Link>
        <nav className="nav">
          <ul className="nav__bar">
            <li className="nav__item">
              <Link to="/home">
                <p className={classNames(
                  'nav__link',
                  { 'is-active': homeLocation },
                )}
                >
                  HOME
                </p>
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/phones">
                <p className={classNames(
                  'nav__link',
                  { 'is-active': phonesLocation },
                )}
                >
                  PHONES
                </p>
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/tablets">
                <p className={classNames(
                  'nav__link',
                  { 'is-active': tabletsLocation },
                )}
                >
                  TABLETS
                </p>
              </Link>

            </li>
            <li className="nav__item">
              <Link to="/accessories">
                <p className={classNames(
                  'nav__link',
                  { 'is-active': accessoriesLocation },
                )}
                >
                  ACCESSORIES
                </p>
              </Link>

            </li>
          </ul>
        </nav>
      </div>

      <div className="header__icons">
        {searchCondition && (
          <Search placeholder={placeholderValue} />
        )}
        {shouldShowBurgerMenu && <BurgerMenu />}
        <Link to="/favorites" className="header__iconsBlock">
          {/* <div className="header__iconsBlock"> */}

          <div className="header__iconsFavorites">
            {favorites.length > 0 && (
              <div
                className="header__iconsFavoritesCount"
              >
                {favorites.length}
              </div>
            )}
            <img
              src={FavoritesIcon}
              alt="Favorites"
              className="header__iconsFavoritesImage"
            />
          </div>
        </Link>

        <Link
          to="/cart"
          className={classNames(
            'header__iconsBlock',
            { 'is-active': cartLocation },
          )}
        >
          <div className="header__iconsCart">
            {totalItemsInCart > 0 && (
              <div className="header__iconsCartCount">
                {totalItemsInCart}
              </div>
            )}
            <img
              src={CardIcon}
              alt="Cart"
              className="header__iconsCartImage"
            />
          </div>

        </Link>
      </div>
    </header>
  );
};
