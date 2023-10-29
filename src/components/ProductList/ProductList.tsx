import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';
import { Filters } from '../Filters/Filters';
import { SortBy } from '../../types/SortBy';
import { Pagination } from '../Pagination/Pagination';
import { SearchParams } from '../../types/SearchParams';

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get(SearchParams.sortBy) || SortBy.Age;
  const perPage = searchParams.get(SearchParams.perPage) || 'All';
  const currentPage = Number(searchParams.get(SearchParams.activePage)) || 1;

  const getNumberOfPerPage = (numberOfPage: string) => {
    return numberOfPage === 'All' ? products.length : Number(numberOfPage);
  };

  const totalItems = products.length;
  const startIndex
    = getNumberOfPerPage(perPage) * currentPage - getNumberOfPerPage(perPage);
  const endIndex
    = Math.min(startIndex + getNumberOfPerPage(perPage), totalItems);

  const visibleProducts = products
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

  return (
    <>
      <Filters />

      <div className="ProductList">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        totalItems={totalItems}
        perPage={Number(perPage)}
      />

    </>
  );
};

export default ProductList;
