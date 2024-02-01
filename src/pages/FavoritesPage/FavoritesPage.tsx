import React, { memo, useContext, useEffect } from 'react';
import ProductsList from '../../components/common/ProductsList';
import { useAppDispatch, useAppSelector } from '../../store/redux/hooks';
import { favoritesActions, favoritesSelector } from '../../store/redux/slices/favoritesSlice';
import ErrorMessage from '../../components/common/ErrorMessage';
import { SearchContext, useSearchHere } from '../../store/contexts/SearchContext';
import Placeholder from '../../components/UI/Placeholder';

export const FavoritesPage: React.FC = memo(() => {
  const { search } = useContext(SearchContext);
  useSearchHere('favorites');
  const dispatch = useAppDispatch();

  const {
    ids,
    products,
    loading,
    error
  } = useAppSelector(favoritesSelector.selectState);

  if (error) {
    return <ErrorMessage message={error} />
  }

  useEffect(() => {
    dispatch(favoritesActions.display({ search }));
  }, [search]);

  return (
    <div className='products-page'>
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
        placeholdersAmount={ids.length}
      />
    </div>
  );
});
