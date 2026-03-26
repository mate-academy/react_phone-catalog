import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProductDetails } from '../../../types/ProductDetails';
import Crumbs from './breadcrumbs.module.scss';
import arrow from '../../../../public/img/my/breadcrumbs/ArrowRight.svg';

type Props = {
  product?: ProductDetails;
};

export const BreadCrumbs: React.FC<Props> = ({ product }) => {
  const { pathname } = useLocation();

  return (
    <nav className={Crumbs.nav}>
      <ul className={Crumbs.nav__list}>
        <li className={Crumbs.nav__item}>
          <Link to={'/'} className={Crumbs.nav__home}></Link>
        </li>

        {['phones', 'tablets', 'accessories', 'favourites'].some(title =>
          pathname.includes(title),
        ) && <img src={arrow} alt=">" className={Crumbs.nav__arrow} />}

        {product && pathname.includes('phones') && (
          <li className={Crumbs.nav__item}>
            <Link to={'/phones'} className={Crumbs.nav__link}>
              Phones
            </Link>
          </li>
        )}

        {!product && pathname.includes('phones') && (
          <li className={Crumbs.nav__item}>
            <p className={Crumbs.nav__text}>Phones</p>
          </li>
        )}

        {product && pathname.includes('tablets') && (
          <li className={Crumbs.nav__item}>
            <Link to={'/tablets'} className={Crumbs.nav__link}>
              Tablets
            </Link>
          </li>
        )}

        {!product && pathname.includes('tablets') && (
          <li className={Crumbs.nav__item}>
            <p className={Crumbs.nav__text}>Tablets</p>
          </li>
        )}

        {product && pathname.includes('accessories') && (
          <li className={Crumbs.nav__item}>
            <Link to={'/accessories'} className={Crumbs.nav__link}>
              Accessories
            </Link>
          </li>
        )}

        {!product && pathname.includes('accessories') && (
          <li className={Crumbs.nav__item}>
            <p className={Crumbs.nav__text}>Accessories</p>
          </li>
        )}

        {product && pathname.includes('favourites') && (
          <li className={Crumbs.nav__item}>
            <Link to={'/favourites'} className={Crumbs.nav__link}>
              Favourites
            </Link>
          </li>
        )}

        {!product && pathname.includes('favourites') && (
          <li className={Crumbs.nav__item}>
            <p className={Crumbs.nav__text}>Favourites</p>
          </li>
        )}

        {product && <img src={arrow} alt=">" className={Crumbs.nav__arrow} />}
        {product && (
          <li className={Crumbs.nav__item}>
            <p className={Crumbs.nav__text}>{product.name}</p>
          </li>
        )}
      </ul>
    </nav>
  );
};
