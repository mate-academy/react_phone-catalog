import styles from './NotFoundPage.module.scss';
import { useLoweredLocation } from '@hooks/useLoweredLocation';

export const PageNotFound = () => {
  const { state } = useLoweredLocation();

  return (
    <div className={styles['not-found-page']}>
      <h1>
        {state?.page === 'ProductDetailsPage'
          ? 'Product was not found'
          : 'Page not found'}
      </h1>

      <div className={styles['not-found-page__content']}>
        <img
          src="./img/page-not-found.png"
          className={styles['not-found-page__image']}
        />
      </div>
    </div>
  );
};
