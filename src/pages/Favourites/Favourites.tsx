/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useFavourites } from '../../context/FavouritesContext';
import ProductCard from '../../componenst/ProductCard';
import styles from './Favourites.module.scss';

const Favourites: React.FC = () => {
  const { favourites } = useFavourites();

  return (
    <section className={styles.favouritesPage}>
      <h1 className={styles.favouritesPage__title}>Favourites</h1>
      {favourites.length > 0 && (
        <p className={styles.favouritesPage__counter}>
          {favourites.length} {favourites.length === 1 ? 'item' : 'items'}
        </p>
      )}

      {/* eslint-disable-next-line react/no-unescaped-entities */}
      {favourites.length === 0 && <p>You haven't added any favourites yet.</p>}

      {favourites.length > 0 && (
        <div className={styles.favouritesPage__grid}>
          {favourites.map(p => (
            <div className={styles.favouritesPage__card} key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favourites;
