import React, { memo, useContext, useEffect } from 'react';
import ProductsList from '../../components/common/ProductsList';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { favoritesActions, favoritesSelector } from '../../store/redux/slices/favoritesSlice';
import ErrorMessage from '../../components/common/ErrorMessage';
import { SearchContext, useSearchHere } from '../../store/contexts/SearchContext';
import Placeholder from '../../components/UI/Placeholder';
import BreadCrumbs from '../../components/UI/BreadCrumbs';

export const FavoritesPage: React.FC = memo(() => {
  const { search } = useContext(SearchContext);
  useSearchHere('favorites');
  const dispatch = useAppDispatch();

  const {
    storageProducts,
    products,
    loading,
    error,
  } = useAppSelector(favoritesSelector.selectState);

  if (error) {
    return <ErrorMessage message={error} />
  }

  useEffect(() => {
    dispatch(favoritesActions.display({ search }));
  }, []);

  const noProductsMessage = search
    ? 'There are no results for this search query'
    : 'You have not selected your favorite products yet';

  return (
    <div className='products-page'>
      <BreadCrumbs />

      <h2 className='products-page__title'>Favorites</h2>

      {loading && <Placeholder width='40px' height='20px' className='products-page__amount' />}
      {!loading && (
        <p className='products-page__amount products-page__amount--without-filters-page'>
          <data value={products.length}>
            {products.length}
          </data> {search ? 'results' : 'items'}
        </p>
      )}

      <ProductsList
        loading={loading}
        products={products}
        placeholdersAmount={storageProducts.length}
        customNoProductsText={noProductsMessage}
      />
    </div>
  );
});
