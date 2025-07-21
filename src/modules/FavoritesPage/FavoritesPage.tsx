import styles from './FavoritesPage.module.scss';
import { useContext } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { DataContext } from '../../context/DataContext';

export const FavoritesPage = () => {
  const { favorites } = useContext(DataContext);

  return (
    <div className={styles.favorites}>
      <div className="container">
        <h1 className={styles.favorites__title}>FavoritesPage</h1>
        <p className={styles.favorites__count}>{favorites.length} items</p>

        <ul className={styles.favorites__list}>
          {favorites.map(product => (
            <li key={product.id} className={styles.favorites__item}>
              <ProductCard product={product} showFullPrice={true} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
