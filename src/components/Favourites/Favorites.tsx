import { useContext } from 'react';
import { ProductsContext } from '../../store/ProductsContext';
import { ProductCard } from '../ProductCard';
import styles from './Favorites.module.scss';
import icons from '../../assets/icons/icons.svg';
import { useNavigate } from 'react-router-dom';

export const Favorites = () => {
  const { favorites } = useContext(ProductsContext);
  const navigate = useNavigate();

  return (
    <div className={styles.favorites}>
      <div className={styles.intro}>
        <button className={styles.navigationHome} onClick={() => navigate('/')}>
          <span className={styles.homeBtn}>
            <svg>
              <use href={`${icons}#home-icon`}></use>
            </svg>
          </span>
          <span className={styles.arrowRight}>
            <svg>
              <use href={`${icons}#arrow-right-icon`}></use>
            </svg>
          </span>
          <span className={styles.productName}>Favorites</span>
        </button>
        <h2 className={styles.favoritesTitle}>Favorites</h2>
      </div>
      <p className={styles.favoritesCount}>{favorites.length} items</p>
      <ul className={styles.favoritesList}>
        {favorites.map(favorite => (
          <ProductCard
            product={favorite}
            showRegularPrice={true}
            imageWrapperSize="large"
          />
        ))}
      </ul>
    </div>
  );
};
