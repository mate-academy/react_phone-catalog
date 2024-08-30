// import { Breadcrumbs } from '@mui/material';
import styles from './FavouritesPage.module.scss';
import { GlobalContext } from '../../shared/GlobalContext/GlobalContext';
import { useContext } from 'react';
import CustomizedBreadcrumbs from '../../shared/BreadCrumbs/BreadCrumbs';
import { Card } from '../../shared/Card/Card';
import classNames from 'classnames';

export const FavouritesPage = () => {
  const { isLiked, isSunSelected } = useContext(GlobalContext);

  return (
    <>
      <div className={styles.crumbs}>
        <CustomizedBreadcrumbs />
      </div>
      <section className={styles.favourites}>
        <div className={styles.favourites__continer}>
          <h2
            className={classNames(styles.favourites__title, {
              [styles.favourites__title_dark]: !isSunSelected,
            })}
          >
            Favourites
          </h2>
          <span
            className={styles.favourites__length}
          >{`${isLiked.length} items`}</span>

          {isLiked.length > 0 ? (
            <div className={styles.favourites__cards}>
              {isLiked.map(product => (
                <Card
                  key={product.id}
                  product={product}
                  category={product.category}
                />
              ))}
            </div>
          ) : (
            <div className={styles.not_favorites_products}></div>
          )}
        </div>
      </section>
    </>
  );
};
