import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { ProductListFilter } from '../../components/ProductListFilter';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductType } from '../../types/ProductType';
import { Status } from '../../types/Status';
import { NoResults } from '../../components/NoResults';
import { NoSearchResults } from '../../components/NoSearchResults';
import {
  usePaginatedProducts,
  useProductsPerPage,
  useSortedProducts,
} from '../../hooks/useProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { formatTotal } from '../../utils/formatTotal';
import { getCategoryData } from '../../utils/getCategoryData';

import './ProductsPage.scss';

type Props = {
  productType: ProductType;
};

export const ProductsPage :React.FC<Props> = ({ productType }) => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { products, status } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const sortedProducts = useSortedProducts(products, productType);

  const sortedProductsTotal = useMemo(() => {
    return sortedProducts.length;
  }, [sortedProducts]);

  const isEmptySortedPoducts = useMemo(() => {
    return sortedProducts.length === 0;
  }, [sortedProducts]);

  const isEmptyQuery = useMemo(() => {
    return query === '';
  }, [query]);

  const productsPerPage = useProductsPerPage(products, productType);

  const paginatedProducts = usePaginatedProducts(products, productType);

  const totalModelString = formatTotal(sortedProductsTotal, 'model');
  const totalResultString = formatTotal(sortedProductsTotal, 'result');
  const { title: pageTitle } = getCategoryData(productType);

  return (
    <section className="Page-Products Products">
      <Breadcrumbs />

      <h1 className="Products-Title SectionTitle">
        {pageTitle}
      </h1>

      <div className="Products-Total Total">
        {status === Status.IDLE
        && (query
          ? totalResultString
          : totalModelString)}
      </div>

      {status === Status.LOADING && <Loader />}

      {status === Status.IDLE && isEmptySortedPoducts
          && (isEmptyQuery
            ? <NoResults productType={productType} />
            : <NoSearchResults productType={productType} />)}

      {status === Status.IDLE && !isEmptySortedPoducts
          && (
            <>
              <ProductListFilter />

              <ProductList products={paginatedProducts} />

              {sortedProductsTotal >= productsPerPage
                && (
                  <Pagination
                    total={sortedProductsTotal}
                    perPage={productsPerPage}
                    currentPage={currentPage}
                  />
                )}
            </>
          )}
    </section>
  );
};
