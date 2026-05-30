import classNames from 'classnames';
import styles from './FavoritesPage.module.scss';
import { useContext } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { FavoritesContext } from '../../context/FavoriteProvider';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  const countModels = favorites.length;

  return (
    <section className={classNames('section', styles.favorites)}>
      <Breadcrumbs classNameProps={styles.favorites__breadcrumbs} />

      <h1 className={classNames('title', styles.favorites__title)}>
        Favorites
      </h1>

      <p className={styles['count-models']}>{countModels} models</p>

      <div
        className={classNames(
          styles['favorites__block-items'],
          styles['block-items'],
        )}
      >
        {!favorites.length ? (
          <p className={styles.favorites__text}>
            You do not have any favorite products yet
          </p>
        ) : (
          favorites.map((product, index) => {
            return (
              <ProductCard
                key={index}
                product={product}
                classNameProp={styles['block-items__item']}
              />
            );
          })
        )}
      </div>
    </section>
  );
};
