import { useContext } from 'react';
import styles from './Favorites.module.scss';
import favoritesEmptyImage from '../../api/img/product-not-found.png';
import { ProductCard } from '../shared/ProductCard';
import { GlobalContext } from '../../app/store/GlobalContext';

import { useNavigate } from 'react-router-dom';
import { getFirstPartAddress } from '../../utils/format';

export const Favorites = () => {
  const { favorites, totalFavoritesItems } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className={styles.favorites}>
        <div className={styles.favorites__navigation}>
          <div
            className={styles.favorites__iconHome}
            onClick={() => navigate('/')}
          ></div>
          <div className={styles.favorites__address}>
            <div className={styles.favorites__iconArrowRight}></div>
            <div className={styles.favorites__pagePathName}>
              {getFirstPartAddress()}
            </div>
          </div>
        </div>
        <h1>Favorites</h1>
        <p className={styles.favorites__amountItems}>
          {`${totalFavoritesItems} items`}
        </p>
        {favorites.length === 0 ? (
          <div className={styles.favorites__imageContainer}>
            <img
              src={favoritesEmptyImage}
              alt="favorites-empty"
              className={styles.favorites__image}
            />
          </div>
        ) : (
          <ul className={styles.favorites__list}>
            {favorites.map(product => (
              <div key={product.itemId} className={styles.favorites__product}>
                <ProductCard product={product} />
              </div>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
