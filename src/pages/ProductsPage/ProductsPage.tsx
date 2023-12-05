import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { ProductListFilter } from '../../components/ProductListFilter';
import { ProductList } from '../../components/ProductList';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { compareProducts } from '../../utils/compareProducts';
import { getProductsPerPage } from '../../utils/getProductsPerPage';
import { ProductType } from '../../types/ProductType';
import { Status } from '../../types/Status';
import { SortBy } from '../../types/SortBy';
import { PerPage } from '../../types/PerPage';

type Props = {
  productType: ProductType;
};

export const ProductsPage :React.FC<Props> = ({ productType }) => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(state => state.products);
  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get('sort') || SortBy.AGE) as SortBy;
  const perPage = (searchParams.get('perPage') || '16') as PerPage;
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productsByType = useMemo(() => {
    return products
      .filter(product => product.type === productType);
  }, [products, productType]);

  const totalProductsByType = productsByType.length;

  const sorted = useMemo(() => {
    return sortBy
      ? productsByType
        .sort((product1, product2) => {
          return compareProducts(product1, product2, sortBy);
        })
      : productsByType;
  }, [productsByType, sortBy]);

  const productsPerPage = useMemo(() => {
    return getProductsPerPage(perPage, totalProductsByType);
  }, [perPage, totalProductsByType]);

  const firstItem = useMemo(() => {
    return (currentPage - 1) * productsPerPage;
  }, [currentPage, productsPerPage]);

  const lastItem = useMemo(() => {
    return Math.min(currentPage * productsPerPage, totalProductsByType);
  }, [currentPage, productsPerPage, totalProductsByType]);

  const paginated = useMemo(() => {
    return sorted
      .filter((_, index) => index >= firstItem && index < lastItem);
  }, [sorted, firstItem, lastItem]);

  const pageTitle = {
    [ProductType.PHONE]: 'Mobile phones',
    [ProductType.TABLET]: 'Tablets',
    [ProductType.ACCESSORY]: 'Accessories',
  };

  return (
    <>
      <h1>{pageTitle[productType]}</h1>

      <ProductListFilter />

      {status === Status.LOADING && <Loader />}

      {status === Status.IDLE && <ProductList products={paginated} />}
      {totalProductsByType > productsPerPage
        && (
          <Pagination
            total={totalProductsByType}
            perPage={productsPerPage}
            currentPage={currentPage}
          />
        )}
    </>
  );
};
