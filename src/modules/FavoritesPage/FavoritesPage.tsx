import type React from 'react';
import { asset } from '../../helper';
import { useFavorites } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductCard } from '../shared/components/ProductCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { items } = useFavorites();

  return (
    <>
      <Breadcrumbs currentLabel="Favourites" />

      <h1 className={styles.title}>Favourites</h1>
      <p className={styles.total}>
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </p>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <img src={asset('img/empty-favorites.jpeg')} alt="Empty page" />
        </div>
      ) : (
        <ul className={styles.list}>
          {items.map(product => (
            <li key={product.id} className={styles.item}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
