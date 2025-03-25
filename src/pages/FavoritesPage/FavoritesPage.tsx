import React from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './FavoritesPage.module.scss';
import { Card } from '../../components/Card';
import { Pagination } from '../../components/Pagination';

import arrowRight from '../../imgs/svg/arrow-right-icon.svg';
import homeIcon from '../../imgs/svg/home-icon.svg';

export const FavoritesPage: React.FC = () => {
  const { favorites, clearFavorites } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get('limit')) || 16;
  const page = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(favorites.length / limit);
  const startIndex = (page - 1) * limit;
  const displayedFavorites = favorites.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage: number) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('page', newPage.toString());

      return newParams;
    });
  };

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__navigate_icons}>
        <NavLink to="/">
          <img
            src={homeIcon}
            alt="home"
            className={styles.favorites__navigate_icon}
          />
        </NavLink>
        <img
          src={arrowRight}
          alt="arrow"
          className={styles.favorites__navigate_icon}
        />
        <p className={styles.favorites__navigate_icon_text}>Favorites</p>
      </div>

      <h1 className={styles.favorites__title}>Favorite phones</h1>
      <p className={styles.favorites__count}>{favorites.length} models</p>

      {favorites.length > 0 && (
        <button
          className={styles.favorites__clearButton}
          onClick={clearFavorites}
        >
          Clear Favorites
        </button>
      )}

      <div className={styles.favorites__list}>
        {displayedFavorites.map(product => (
          <Card
            key={product.id}
            card={{
              id: Number(product.id),
              category: product.category,
              itemId: product.itemId,
              name: product.name,
              fullPrice: product.fullPrice,
              price: product.price,
              screen: product.screen,
              capacity: product.capacity,
              color: product.color,
              ram: product.ram,
              year: product.year,
              image: `${product.image}`,
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
