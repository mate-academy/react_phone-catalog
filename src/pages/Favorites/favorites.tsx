import React, { useContext } from 'react';
import { ArrayContext } from '../../ArrayContext';
import { Catalog } from '../../components/catalog/catalog';
import { Link, useLocation } from 'react-router-dom';
import home from '../../img/icons/home.svg';
import arrowRight from '../../img/icons/arrowRight.svg';

export const Favorites: React.FC = () => {
  const { favoriteProducts } = useContext(ArrayContext);
  const location = useLocation();
  const pathname = location.pathname.split('').slice(1).join('');

  return (
    <section className="favorites">
      <div className="products__nav">
        <Link className="products__home" to={'/'}>
          <img src={home} className="img" alt="" />
        </Link>
        <img src={arrowRight} alt="arrowRight" />
        <p className="products__pathname">
          {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
        </p>
      </div>
      <div className="products__title">
        <h1 className="products__h1">Favourites</h1>
        <p className="products__subtitle">{favoriteProducts.length} models</p>
      </div>
      <div>
        <Catalog products={favoriteProducts} />
      </div>
    </section>
  );
};
