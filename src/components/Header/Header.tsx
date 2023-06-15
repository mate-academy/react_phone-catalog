import { useMemo, useState } from 'react';
// styles & images
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import LogoIcon from '../../images/icons/Logo.svg';
import FavoritesIcon from '../../images/icons/Favourites (Heart Like).svg';
import CardIcon from '../../images/icons/Shopping bag (Cart).svg';
import './header.scss';
import { Search } from '../Search/Search';

export const Header = () => {
  const location = useLocation();

  const homeLocation = location.pathname.includes('home');
  const phonesLocation = location.pathname.includes('phones');
  const tabletsLocation = location.pathname.includes('tablets');
  const accessoriesLocation = location.pathname.includes('accessories');
  const searchCondition = phonesLocation
  || tabletsLocation
  || accessoriesLocation;
  const [placeholderValue, setPlaceholderValue] = useState('');

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
  }, [phonesLocation, tabletsLocation, accessoriesLocation]);

  return (
    <header className="header">
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

        <div className="header__iconsBlock">
          <Link to="/favorites">
            <div className="header__iconsFavorites">
              <img
                src={FavoritesIcon}
                alt="Favorites"
                className="header__iconsFavoritesImage"
              />
            </div>
          </Link>

        </div>

        <div className={classNames(
          'header__iconsBlock',
          'header__iconsBlock--cart',
          { 'header__iconsBlock--cart--none': location.pathname === '/cart' },
        )}
        >
          <Link to="/cart">
            <div className="header__iconsCart">
              <img
                src={CardIcon}
                alt="Cart"
                className="header__iconsCartImage"
              />
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
};
