import styles from './FavoritesPage.module.scss';
import { useContext } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { DataContext } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favorites } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className={styles.favorites}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Back
        </button>
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
