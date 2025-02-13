import { useLocation } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const PageNotFound = () => {
  const { state } = useLocation();

  return (
    <div className={styles['not-found-page']}>
      <h1>
        {state.page === 'ProductDetailsPage'
          ? 'Product was not found'
          : 'Page not found'}
      </h1>

      <main className={styles['not-found-page__content']}>
        <img
          src="./img/page-not-found.png"
          className={styles['not-found-page__image']}
        />
      </main>
    </div>
  );
};
