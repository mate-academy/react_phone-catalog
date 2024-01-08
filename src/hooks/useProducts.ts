import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { ProductType } from '../types/ProductType';
import { SortBy } from '../types/SortBy';
import { containQuery } from '../utils/containQuery';
import { compareProducts } from '../utils/compareProducts';

const useProductsByType = (products: Product[], productType: ProductType) => {
  const productsByType = useMemo(() => {
    return products
      .filter(product => product.type === productType);
  }, [products, productType]);

  return productsByType;
};

const useSearchedProducts = (
  products: Product[],
  productType: ProductType,
) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const productsByType = useProductsByType(products, productType);

  const searchedProducts = useMemo(() => {
    return query
      ? productsByType.filter(product => containQuery(product, query))
      : productsByType;
  }, [productsByType, query]);

  return searchedProducts;
};

export const useSortedProducts = (
  products: Product[],
  productType: ProductType,
) => {
  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get('sort') || '') as SortBy;

  const searchedProducts = useSearchedProducts(products, productType);

  const sortedProducts = useMemo(() => {
    return sortBy
      ? [...searchedProducts]
        .sort((product1, product2) => {
          return compareProducts(product1, product2, sortBy);
        })
      : searchedProducts;
  }, [searchedProducts, sortBy]);

  return sortedProducts;
};

export const useProductsPerPage = (
  products: Product[],
  productType: ProductType,
) => {
  const sortedProducts = useSortedProducts(products, productType);

  const [searchParams] = useSearchParams();
  const perPageParam = searchParams.get('perPage') || '';

  const productsPerPage = useMemo(() => {
    return Number(perPageParam) || sortedProducts.length;
  }, [perPageParam, sortedProducts]);

  return productsPerPage;
};

export const usePaginatedProducts = (
  products: Product[],
  productType: ProductType,
) => {
  const sortedProducts = useSortedProducts(
    products, productType,
  );

  const productsPerPage = useProductsPerPage(
    products, productType,
  );

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const firstItem = useMemo(() => {
    return (currentPage - 1) * productsPerPage;
  }, [currentPage, productsPerPage]);

  const lastItem = useMemo(() => {
    const sortedProductsTotal = sortedProducts.length;

    return Math.min(currentPage * productsPerPage, sortedProductsTotal);
  }, [currentPage, productsPerPage, sortedProducts]);

  const paginatedProducts = useMemo(() => {
    return sortedProducts
      .filter((_, index) => index >= firstItem && index < lastItem);
  }, [sortedProducts, firstItem, lastItem]);

  return paginatedProducts;
};
