import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ProductCard } from '../products/productCard';
import styles from './favorite.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const Favorite: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorite.items);
  const navigate = useNavigate();

  const handleProductClick = (
    selectedId: number | string,
    selectedProductId: string,
    category: string,
  ) => {
    const idToNavigate = selectedProductId || selectedId;

    navigate(`/${category}/${idToNavigate}`);
  };

  return (
    <section className={classNames(styles.favorite, 'container')}>
      <h1 className={styles.favorite_title}>Favourites</h1>
      {favorites.length > 0 ? (
        <p className={styles.favorite_quantity}>{favorites.length} items</p>
      ) : (
        <p className={styles.favorite_text}>You dont have favorites items</p>
      )}

      <ul className={styles.favorite_list}>
        {favorites.map(fav => (
          <ProductCard
            key={fav.id}
            {...fav}
            onClick={() => handleProductClick(fav.id, fav.itemId, fav.category)}
          />
        ))}
      </ul>
    </section>
  );
};
