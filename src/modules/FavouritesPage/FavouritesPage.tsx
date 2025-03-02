import { useContext } from 'react';
import classNames from 'classnames';
import { ProductsList } from '../CategoryPage/components/ProductsList';
import { FavouritesContext } from '../../context/FavouritesContext';
import styles from './FavouritesPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { NoItemsMessage } from '../shared/components/NoItemsMessage';

export const FavouritesPage = () => {
  const { favouriteItems, favouritesCount } = useContext(FavouritesContext);

  return (
    <div className={styles.page}>
      <div className={styles.breadCrumbsContainer}>
        <Breadcrumbs />
      </div>

      <h1
        className={classNames(styles.title, {
          [styles['title--noItems']]: !favouritesCount,
        })}
      >
        Favourites
      </h1>

      {favouritesCount === 0 ? (
        <NoItemsMessage message={'No favourite items found'} />
      ) : (
        <>
          <p className={styles.itemsAmount}>{favouritesCount} items</p>
          <ProductsList itemsPerPage={favouritesCount} items={favouriteItems} />
        </>
      )}
    </div>
  );
};
