import styles from './FavoritesPage.module.scss';
import { useContext } from 'react';
import { PageTop } from '../../shared/components/PageTop/PageTop';
import { FavoritesContext } from '../../context/FavoritesContext';
import empty from '../../../public/img/cart-is-empty.png';
import { ProductList } from '../../shared/components/ProductList/ProductList';

export const FavoritesPage = () => {
  const { items } = useContext(FavoritesContext);

  return (
    <>
      {items.length === 0 ? (
        <div className={styles['favorites__empty-container']}>
          <img src={empty} alt="empty" className={styles.favorites__empty} />
        </div>
      ) : (
        <>
          <PageTop pageName="Favorites" />
          <div className={styles.favorites}>
            <h1 className={styles.favorites__title}>Favorites</h1>
            <span className={`${styles.favorites__quantity} body-text`}>{items.length} items</span>

            <ProductList products={items} />
          </div>
        </>
      )}
    </>
  );
};
