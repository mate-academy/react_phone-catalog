import classNames from 'classnames';

import styles from './Favourites.module.scss';
import { useContext } from 'react';
import { StateContext } from '../../Store';
import { ProductCard } from '../components/ProductCard';
import { Navigation } from '../components/Navigation';
import { Placeholder } from '../components/Placeholder';

export const Favourites = () => {
  const { favourites } = useContext(StateContext);

  return (
    <>
      <Navigation category={'favourites'} />

      {favourites.length === 0 ? (
        <Placeholder />
      ) : (
        <div className={classNames(styles.container, styles.favourites)}>
          <h1 className={styles.pageHead}>Favourites</h1>

          <span
            className={styles.pageNumbers}
          >{`${favourites.length} items`}</span>

          <div className={styles.favourites__productList}>
            {favourites.map(product => (
              <article
                key={product.id}
                className={styles.favourites__productCard}
              >
                <ProductCard product={product} discount />
              </article>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
