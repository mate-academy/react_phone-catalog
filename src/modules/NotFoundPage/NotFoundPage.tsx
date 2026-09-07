import styles from './NotFoundPage.module.scss';
import { useLoweredLocation } from '@hooks/useLoweredLocation';

export const PageNotFound = () => {
  const { state } = useLoweredLocation();
  const product = state?.page === 'ProductDetailsPage';

  return (
    <div className={styles['not-found-page']}>
      <h1>{product ? 'Product was not found' : 'Page not found'}</h1>

      <div className={styles['not-found-page__content']}>
        <img
          src={
            product ? './img/product-not-found.png' : './img/page-not-found.png'
          }
          className={styles['not-found-page__image']}
        />
      </div>
    </div>
  );
};
