import { useFavorite } from '../../hooks/useFavoriteContext';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductList } from '../../components/ProductList';
import { FavoriteEmpty } from './FavoriteEmpty';

import styles from './FavoritePage.module.scss';

export const FavoritePage = () => {
  const { favorite, dispatch } = useFavorite();

  const products = favorite.map(item => item.product);

  return (
    <section className={styles['favorite-page']}>
      <div className={styles['favorite-page__wrapper']}>
        <Breadcrumbs />

        <div className={styles['favorite-page__row']}>
          <h1 className={styles['favorite-page__title']}>Favourites</h1>
          <button
            className={styles['favorite-page__clear-button']}
            onClick={() => dispatch({ type: 'clear' })}
          >
            Clear
          </button>
        </div>

        <p className={styles['favorite-page__count-item']}>
          {favorite.length} items
        </p>

        {products.length === 0 && <FavoriteEmpty />}

        <ProductList products={products} isLoading={false} />
      </div>
    </section>
  );
};
