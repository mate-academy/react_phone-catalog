import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { ProductListFilter } from '../../components/ProductListFilter';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductType } from '../../types/ProductType';
import { Status } from '../../types/Status';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';
import { NoResults } from '../../components/NoResults';
import { NoSearchResults } from '../../components/NoSearchResults';
import {
  useProducts,
  useProductsTotal,
  usePaginatedProducts,
  useProductsPerPage,
} from '../../hooks/useProducts';

type Props = {
  productType: ProductType;
};

export const ProductsPage :React.FC<Props> = ({ productType }) => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = (searchParams.get('sort') || SortBy.AGE) as SortBy;
  const perPage = (searchParams.get('perPage') || 'all') as PerPage;
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const preparedProducts = useProducts(products, productType, query, sortBy);

  const preparedProductsTotal = useProductsTotal(preparedProducts);

  const productsPerPage = useProductsPerPage(preparedProducts, perPage);

  const paginatedProducts = usePaginatedProducts(
    preparedProducts, perPage, currentPage,
  );

  const pageTitle = {
    [ProductType.PHONE]: 'Mobile phones',
    [ProductType.TABLET]: 'Tablets',
    [ProductType.ACCESSORY]: 'Accessories',
  };

  const noResults = query === ''
    ? <NoResults productType={productType} />
    : <NoSearchResults productType={productType} />;

  return (
    <>
      {status === Status.LOADING && <Loader />}

      {status === Status.IDLE
        && (
          preparedProductsTotal === 0
            ? noResults
            : (
              <>
                <h1>{pageTitle[productType]}</h1>

                <ProductListFilter />

                <ProductList products={paginatedProducts} />

                <Pagination
                  total={preparedProductsTotal}
                  perPage={productsPerPage}
                  currentPage={currentPage}
                />
              </>
            )
        )}
    </>
  );
};
