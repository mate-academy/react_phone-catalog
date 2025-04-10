import './Favorites.module.scss';

import { useContext } from 'react';
import { ProductList } from '../../shared/ProductList/ProductList';
import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';
import { Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';

export const Favorites = () => {
  const { favItems } = useContext(LocalStorageContext);
  return (
    <div className="favorites">
      <Breadcrumbs />

      <div className="favorites__title">
        <h1 className="favorites__title__heading">Favourites</h1>

        <p className="favorites__title__subtitle">
          {`${favItems.length} items`}
        </p>
      </div>

      <ProductList products={favItems} />
    </div>
  );
};
