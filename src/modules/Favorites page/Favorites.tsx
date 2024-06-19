import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCard } from '../Home page/components/PhoneCard/PhoneCard';
import './Favorites.scss';
import { useAppSelector } from '../../app/hooks';

export const Favorites: React.FC = () => {
  const { favorites } = useAppSelector(state => state.user);

  return (
    <section className="favorites container">
      {favorites.length === 0 ? (
        <div className="favorites__empty">
          <img
            className='favorites__empty'
            src="../../../img/product-not-found.png"
            alt="not-found"
          />
          <h1 className="favorites__title">No favorites devices</h1>
        </div>
      ) : (
        <>
          <div className="product__history">
            <Link to="/" className="product__link">
              <img src="../../../img/links/home.svg" alt="home" />
            </Link>
            <img
              src="../../../img/links/chevron (arrow right).svg"
              alt="chevron_right"
            />
            <Link to={`/favorites`} className="product__link">
              Favorites
            </Link>
          </div>

          <h1 className="product__title">Favorites</h1>
          <p className="product__description">{favorites.length} items</p>

          <div className="product__all">
            {favorites.map(product => (
              <PhoneCard key={product.id} product={product} isHot={true} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
