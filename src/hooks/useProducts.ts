import { useMemo } from 'react';
import { Product } from '../types/Product';
import { ProductType } from '../types/ProductType';
import { SortBy } from '../types/SortBy';
import { PerPage } from '../types/PerPage';
import { containQuery } from '../utils/containQuery';
import { compareProducts } from '../utils/compareProducts';
import { getProductsPerPage } from '../utils/getProductsPerPage';

const useFilteredProducts = (
  products: Product[],
  productType: ProductType,
  query: string,
) => {
  const filteredByType = useMemo(() => {
    return products
      .filter(product => product.type === productType);
  }, [products, productType]);

  const filteredByQuery = useMemo(() => {
    return query
      ? filteredByType.filter(product => containQuery(product, query))
      : filteredByType;
  }, [filteredByType, query]);

  return filteredByQuery;
};

const useFilteresAndSortedProducts = (
  products: Product[],
  productType: ProductType,
  query: string,
  sortBy: SortBy,
) => {
  const filteredProducts = useFilteredProducts(products, productType, query);

  const sortedProducts = useMemo(() => {
    return sortBy
      ? [...filteredProducts]
        .sort((product1, product2) => {
          return compareProducts(product1, product2, sortBy);
        })
      : filteredProducts;
  }, [filteredProducts, sortBy]);

  return sortedProducts;
};

export const useProducts = (
  products: Product[],
  productType: ProductType,
  query: string,
  sortBy: SortBy,
) => {
  const preparedProducts = useFilteresAndSortedProducts(
    products, productType, query, sortBy,
  );

  return preparedProducts;
};

export const useProductsTotal = (
  products: Product[],
) => {
  const preparedProductsTotal = useMemo(() => {
    return products.length;
  }, [products]);

  return preparedProductsTotal;
};

export const useProductsPerPage = (
  products: Product[],
  perPage: PerPage,
) => {
  const preparedProductsTotal = useProductsTotal(products);

  const productsPerPage = useMemo(() => {
    return perPage === 'all' || perPage === ''
      ? preparedProductsTotal
      : getProductsPerPage(perPage);
  }, [perPage, preparedProductsTotal]);

  return productsPerPage;
};

export const usePaginatedProducts = (
  products: Product[],
  perPage: PerPage,
  currentPage: number,
) => {
  const preparedProductsTotal = useProductsTotal(products);
  const productsPerPage = useProductsPerPage(products, perPage);

  const firstItem = useMemo(() => {
    return (currentPage - 1) * productsPerPage;
  }, [currentPage, productsPerPage]);

  const lastItem = useMemo(() => {
    return Math.min(currentPage * productsPerPage, preparedProductsTotal);
  }, [currentPage, productsPerPage, preparedProductsTotal]);

  const paginated = useMemo(() => {
    return products
      .filter((_, index) => index >= firstItem && index < lastItem);
  }, [products, firstItem, lastItem]);

  return paginated;
};
