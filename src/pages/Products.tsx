import { useGetProductsQuery } from '../services/productsApi';
import { usePagination } from '../hooks/usePagination';
import type { FC } from 'react';
import { Category, Sort } from '../types';
import { DropdownProvider } from '../providers/DropdownProvider';
import { Dropdown } from '../components/Dropdown';
import { ProductList } from '../components/Product/ProductList';
import { Pagination } from '../components/Pagination/Pagination';

interface Props {
  category: Category;
  title: string;
}

export const ProductsPage: FC<Props> = ({ category, title }) => {
  const { isLoading } = useGetProductsQuery();
  const {
    visibleProducts,
    totalProducts,
    currentPage,
    visiblePages,
    totalPages,
    setPage,
  } = usePagination(category);

  if (isLoading) {
    return (
      <span className="text-h1 text-primary dark:text-d-white mt-6 inline-block sm:mt-10">
        Loading...
      </span>
    );
  }

  if (!isLoading && (!visibleProducts || visibleProducts.length < 1)) {
    return (
      <span className="text-h1 text-primary dark:text-d-white mt-6 inline-block sm:mt-10">
        There are no {category} yet
      </span>
    );
  }

  return (
    <>
      <h1 className="sr-only">{title} page</h1>
      <span className="text-h1 text-primary dark:text-d-white mt-6 inline-block sm:mt-10">
        {title}
      </span>

      <p className="text-body text-secondary dark:text-d-secondary mt-2">
        {totalProducts} {totalProducts === 1 ? 'model' : 'models'}
      </p>

      <div className="pageGrid mt-8 sm:mt-10">
        <DropdownProvider>
          <Dropdown
            description="Sort by"
            options={{
              Newest: Sort.Age,
              Alphabetically: Sort.Title,
              Cheapest: Sort.Price,
            }}
            searchParam="sort"
            defaultValue={Sort.Age}
            className="col-span-2 sm:col-span-4"
          />
          <Dropdown
            description="Items on page"
            options={{ 4: '4', 8: '8', 16: '16', All: 'all' }}
            searchParam="perPage"
            defaultValue="all"
            className="col-span-2 sm:col-span-3"
          />
        </DropdownProvider>
      </div>

      <ProductList products={visibleProducts} className="mt-6" />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setPage}
          pages={visiblePages}
          totalPages={totalPages}
        />
      )}
    </>
  );
};
