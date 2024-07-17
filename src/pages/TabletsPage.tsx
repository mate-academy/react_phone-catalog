import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';
import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { ProductsListError } from '../components/ProductsListError';
import { DEFAULT_QUERY, DEFAULT_SORT } from '../constants';
import { SearchParamsValue } from '../types/SearchParamsValue';
import { getFilteredProducts } from '../utils/getFilteredProducts';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Category } from '../types/Category';

export const TabletsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    setReload(false);

    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [reload]);

  const categoryProducts = products.filter(
    item => item.category === Category.TABLETS,
  );

  const sortBy: string =
    searchParams.get(SearchParamsValue.SORT) || DEFAULT_SORT;
  const query: string =
    searchParams.get(SearchParamsValue.QUERY) || DEFAULT_QUERY;

  const preparedProducts = getFilteredProducts(categoryProducts, query, sortBy);

  const showProductList = !isLoading && !error;

  return (
    <>
      <Breadcrumbs />

      {isLoading && <Loader />}

      {error && <ProductsListError reload={setReload} />}

      {showProductList && <ProductsList products={preparedProducts} />}
    </>
  );
};
