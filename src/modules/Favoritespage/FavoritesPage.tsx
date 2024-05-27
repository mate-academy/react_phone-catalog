import { Link } from 'react-router-dom';
import { useAppSelector } from '../shared/hooks/hooks';
import styles from './FavoritesPage.module.scss';
import usePageLocation from '../shared/hooks/usePageLocation';
import { ProductCard } from '../HomePage/components/ProductCard';

export const FavoritesPage = () => {
  const { favorite } = useAppSelector(state => state.selectedProduct);
  const { pageLocation } = usePageLocation();

  return (
    <div className={styles.favorite}>
      <div className={styles.favorite__location}>
        <Link className={styles.favorite__home__img} to="/"></Link>
        <span className={styles.favorite__arrow}></span>
        <span className={styles.favorite__plase}>{pageLocation}</span>
      </div>
      <h1 className={styles.favorite__title}>{`${pageLocation}`}</h1>
      <div className={styles.favorite__items}>
        {`${favorite.length} models`}
      </div>
      {favorite.length ? (
        <div className={styles.product}>
          {favorite?.map(phone => (
            <div key={phone.id} className={styles.product__page}>
              <ProductCard phone={phone} isDiscount={true} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.page}>
          <img
            src="/img/product-not-found.png"
            className={styles.page__img}
            alt="img"
          />
        </div>
      )}
    </div>
  );
};
