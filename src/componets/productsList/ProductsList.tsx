import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductCard } from '../productCard/ProductCard';
import { SortForm } from '../sortForm/SortForm';
import './ProductsList.scss';
import { Product } from '../../types/Product';
import { useSortAndSearch } from '../../utils/useSortAndSearch';
import { Pagination } from '../pagination/Pagination';
import { SELECT } from '../../types/Select';
import { NoResults } from '../noResults/NoResults';
import { getProducts } from '../../redux/thunks/product.thunk';
import { Loader } from '../loader/Loader';
import { setSortBy } from '../../redux/reducers/sortReducer';
import {
  setModifiedProducts,
} from '../../redux/reducers/modifiedProductsReducer';
import { Error } from '../error/Error';

export const ProductsList = () => {
  const products = useAppSelector(state => state.products.list);
  const searchQuery = useAppSelector(state => state.search.query);
  const sortBy = useAppSelector(state => state.sort.sortBy);

  const dispatch = useAppDispatch();

  const modifiedProducts = useSortAndSearch(products, sortBy, searchQuery);

  useEffect(() => {
    dispatch(setModifiedProducts(modifiedProducts));
  }, [dispatch, modifiedProducts]);

  const currentPage = useAppSelector(state => state.pagination.currentPage);
  const productsPerPage = useAppSelector(
    state => state.pagination.productsPerPage,
  );
  const loading = useAppSelector(state => state.products.isLoading);
  const hasError = useAppSelector(state => state.products.hasError);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = modifiedProducts.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSortBy(sortBy));
  }, [dispatch, sortBy]);

  return (
    <div className="productsList" data-cy="productList">

      {loading && <Loader />}
      {(hasError && !loading) && <Error />}

      {!loading && !hasError
      && (modifiedProducts.length === 0) && <NoResults />}
      {!loading && !hasError && (modifiedProducts.length > 0) && (
        <>
          <SortForm />
          <div className="productsList__container">
            {currentProducts.map((product: Product) => (
              <ProductCard product={product} key={product.id} />))}
          </div>
          {productsPerPage !== SELECT.All
          && <Pagination length={modifiedProducts.length} />}
        </>
      )}
    </div>
  );
};
