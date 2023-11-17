/* eslint-disable react/require-default-props */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';
import { Filters } from '../Filters/Filters';
import { SortBy } from '../../types/SortBy';
import { Pagination } from '../Pagination/Pagination';
import { SearchParamsType } from '../../types/SearchParamsTypes';
import { normalizeValue } from '../../helpers/normalizeValue';

interface Props {
  products: Product[];
  isfilterVisible?: boolean;
  isPaginationVisible?: boolean;
}

const ProductList: React.FC<Props> = ({
  products,
  isfilterVisible = true,
  isPaginationVisible = true,
}) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get(SearchParamsType.sortBy) || SortBy.Age;
  const perPage = searchParams.get(SearchParamsType.perPage) || 'All';
  const currentPage = Number(searchParams.get(
    SearchParamsType.activePage,
  )) || 1;
  const query = searchParams.get(SearchParamsType.query) || '';

  const getNumberOfPerPage = (numberOfPage: string) => {
    return numberOfPage === 'All' ? products.length : Number(numberOfPage);
  };

  const startIndex
    = getNumberOfPerPage(perPage) * currentPage - getNumberOfPerPage(perPage);
  const endIndex = startIndex + getNumberOfPerPage(perPage);

  const filteredProducts = query === ''
    ? products
    : products.filter(product => (
      normalizeValue(product.name).includes(normalizeValue(query))
    ));

  const visibleProducts = filteredProducts
    .sort((a: Product, b: Product) => {
      switch (sortBy) {
        case SortBy.Age:
          return b.age - a.age;
        case SortBy.Name:
          return a.name.localeCompare(b.name);
        case SortBy.Price:
          return a.price - b.price;
        default:
          return 0;
      }
    })
    .slice(startIndex, endIndex);

  const totalItems = filteredProducts.length;

  return (
    <>
      {isfilterVisible && visibleProducts.length !== 0 && <Filters />}

      {visibleProducts.length === 0
        ? (
          <h1>Sorry, we can not find your product</h1>
        )
        : (
          <div className="ProductList">
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      {isPaginationVisible && visibleProducts.length !== 0 && (
        <Pagination
          totalItems={totalItems}
          perPage={Number(perPage)}
        />
      )}

    </>
  );
};

export default ProductList;
