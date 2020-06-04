import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../helpers/FavoritesContext';
import './FavoritePage.scss';
import Card from '../ProductCard/ProductCard';

const FavoritePage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorite-page">
      <section className="nav-location">
        <Link to="/" className="nav-location__svg-home">
          <img src="./img/home.svg" alt="home" />
        </Link>
        <div className="nav-location__svg-arrow">
          <img src="./img/ArrowRightActive.svg" alt="arrow" />
        </div>
        <Link to="/phones" className="nav-location__text nav-location__text-item nav-location__text-item-link">Favourites</Link>
      </section>
      <section className="phones-page__article">
        <h2 className="phones-page__article-title">Favourites</h2>
        <p className="phones-page__article-count">
          {favorites.length}
          {' '}
          items
        </p>
      </section>
      <section className="favorite-page__produc-list">
        <ul className="product-list">
          {favorites.map((item) => (
            <li key={item.id}>
              <Card phone={item} />
            </li>
          ))}
        </ul>
        {favorites.length === 0 && <div className="favorite-page__empty" />}
      </section>
    </div>
  );
};

export default FavoritePage;
