import { Link, useLocation } from 'react-router-dom';
import nav from './Nav.module.scss';
import { DetailedProduct } from '../../../../types/DetailedProduct';
import React from 'react';

type Props = {
  product?: DetailedProduct;
};

export const Nav: React.FC<Props> = ({ product }) => {
  const { pathname } = useLocation();

  return (
    <nav className={nav.nav}>
      <ul className={nav.nav__list}>
        <li className={nav.nav__item}>
          <Link to={'/'} className={nav.nav__home}></Link>
        </li>

        {['tablets', 'phones', 'accessories', 'favourites'].some(title =>
          pathname.includes(title),
        ) && <img src="img\nav\arrow.svg" alt=">" />}

        {product && pathname.includes('tablets') && (
          <li className={nav.nav__item}>
            <Link to={'/tablets'} className={nav.nav__link}>
              Tablets
            </Link>
          </li>
        )}

        {!product && pathname.includes('tablets') && (
          <li className={nav.nav__item}>
            <p className={nav.nav__span}>Tablets</p>
          </li>
        )}

        {product && pathname.includes('phones') && (
          <li className={nav.nav__item}>
            <Link to={'/phones'} className={nav.nav__link}>
              Phones
            </Link>
          </li>
        )}

        {!product && pathname.includes('phones') && (
          <li className={nav.nav__item}>
            <p className={nav.nav__span}>Phones</p>
          </li>
        )}

        {product && pathname.includes('accessories') && (
          <li className={nav.nav__item}>
            <Link to={'/accessories'} className={nav.nav__link}>
              Accessories
            </Link>
          </li>
        )}

        {!product && pathname.includes('accessories') && (
          <li className={nav.nav__item}>
            <p className={nav.nav__span}>Accessories</p>
          </li>
        )}

        {pathname.includes('favourites') && (
          <li className={nav.nav__item}>
            <p className={nav.nav__span}>Favourites</p>
          </li>
        )}

        {product && <img src="img\nav\arrow.svg" alt=">" />}
        {product && (
          <li className={nav.nav__item}>
            <p className={nav.nav__span}>{product.name}</p>
          </li>
        )}
      </ul>
    </nav>
  );
};
