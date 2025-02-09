import React, { useContext } from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductList } from '../ProductList';
import styles from './Favourites.module.scss';
import { FavouritesContext } from '../Contexts/FavouritesContext';

export const Favourites: React.FC = () => {
  const { favProducts } = useContext(FavouritesContext);

  const items = favProducts.length;

  return (
    <div className="favouritesPage">
      <Breadcrumbs page={'favourites'} />

      <div className={styles.favouritesPageTitle}>
        <h1>Favourites</h1>
        <p className="body-text-small grayText">{`${items}`} items</p>
      </div>

      {favProducts.length > 0 && <ProductList itemsList={favProducts} />}
    </div>
  );
};
