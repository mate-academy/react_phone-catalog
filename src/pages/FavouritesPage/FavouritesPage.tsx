import { useContext } from 'react';
import styles from './FavouritesPage.module.scss';
import { FavouriteContext } from '../../context/FavouriteProvider';
import classNames from 'classnames';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductCard } from '../../components/ProductCard';

export const FavouritesPage = () => {
  const { favourites } = useContext(FavouriteContext);

  const modelsAmount = favourites.length;

  return (
    <section className={classNames('section', styles.favourites)}>
      <BreadCrumbs classNameProps={styles.favourites__breadcrumbs} />

      <h1 className={classNames('title', styles.favourites__title)}>
        Favourites
      </h1>

      <p className={styles.favourites__amount}>{modelsAmount} models</p>

      <div
        className={classNames(
          styles['favourites__product-list'],
          styles['product-list'],
        )}
      >
        {!favourites.length ? (
          <p className={styles.favourites__text}>
            You do not have any favourite products yet
          </p>
        ) : (
          favourites.map((product, index) => {
            return (
              <ProductCard
                key={index}
                product={product}
                classNameProp={styles['product-list__item']}
              />
            );
          })
        )}
      </div>
    </section>
  );
};
