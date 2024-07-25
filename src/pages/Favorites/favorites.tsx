import React, { useContext } from 'react';
import { ArrayContext } from '../../ArrayContext';
import { Catalog } from '../../components/catalog/catalog';
import { Link, useLocation } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const { favoriteProducts } = useContext(ArrayContext);
  const location = useLocation();
  const pathname = location.pathname.split('').slice(1).join('');

  return (
    <section className="favorites">
      <div className="products__nav">
        <Link className="background-home" to={'/'} />
        <Link to={pathname.split('/').slice(1, 2).join('/')}
          className="products__pathname nav-part small-text"
        >
          {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
        </Link>
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
