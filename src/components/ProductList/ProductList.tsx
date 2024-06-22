/* eslint-disable @typescript-eslint/indent */
import React, { useContext } from 'react';
import styles from './ProductList.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { FilterType, ItemsPerPage } from '../../types/Filter';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { ProductContext } from '../../context/ProductContext';
import { Skeleton } from '../Skeleton';

interface Props {
  product: Product[];
}

const ProductList: React.FC<Props> = ({ product }) => {
  const { loading } = useContext(ProductContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const perPage = searchParams.get('perPage') || ItemsPerPage.Four;
  const sortType = searchParams.get('sort') || 'age';

  const actualPerPage = perPage === 'All' ? product.length : parseInt(perPage);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: event.target.value, page: '1', perPage });
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      perPage: event.target.value,
      page: '1',
      sort: sortType,
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), perPage, sort: sortType });
  };

  const sortedProducts = [...product].sort((a, b) => {
    switch (sortType) {
      case 'age':
        return b.year - a.year;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const startIndex = (page - 1) * actualPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + actualPerPage,
  );
  const totalPages = Math.ceil(product.length / actualPerPage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <Dropdown
          label="Sort by"
          value={sortType}
          onChange={handleSortChange}
          options={Object.entries(FilterType).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        />
        <Dropdown
          label="Items per page"
          onChange={handlePerPageChange}
          value={perPage}
          options={Object.values(ItemsPerPage).map(value => ({
            value,
            label: value,
          }))}
        />
      </div>

      <div className={styles.container}>
        {loading
          ? Array.from({ length: actualPerPage }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : paginatedProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
      </div>

      {perPage !== 'All' && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;
