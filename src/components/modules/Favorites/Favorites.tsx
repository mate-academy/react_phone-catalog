import './Favorites.style.scss';

import { useContext, useEffect } from 'react';
import { ProductList } from '../../shared/ProductList/ProductList';
import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';
import { Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';
import { resetCrumbs } from '../../../features/CrumbsSlice/CrumbsSlice';
import { useAppDispatch } from '../../../app/hooks';

export const Favorites = () => {
  const { favItems } = useContext(LocalStorageContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetCrumbs(['favorite']));
  });

  return (
    <div className="favorites">
      <Breadcrumbs />

      <div className="favorites__title">
        <h1 className="favorites__title__heading">Favourites</h1>

        <p className="favorites__title__subtitle">
          {`${favItems.length} items`}
        </p>
      </div>

      {favItems.length > 0 ? (
        <ProductList products={favItems} />
      ) : (
        <p>You have not chosen favorite products yet</p>
      )}
    </div>
  );
};
