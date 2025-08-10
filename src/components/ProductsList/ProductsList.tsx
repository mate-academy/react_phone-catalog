import { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CustomPagination } from '../Pagination';

type Props = {
  items: Product[];
  itemsPerPage: number;
};

export const ProductsList: React.FC<Props> = ({ items, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items.length, itemsPerPage],
  );

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [currentPage, items, itemsPerPage]);

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');

  const updateSearchParams = useCallback(
    (callback: (params: URLSearchParams) => void) => {
      setSearchParams(prevParams => {
        const params = new URLSearchParams(prevParams);
        callback(params);
        return params;
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    setIsLoading(true);
    updateSearchParams(params => params.delete('page'));
    setTimeout(() => setIsLoading(false), 300);
  }, [sort, perPage, updateSearchParams]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setIsLoading(true);
    setCurrentPage(page);

    updateSearchParams(params => {
      page > 1 ? params.set('page', page.toString()) : params.delete('page');
    });

    setTimeout(() => setIsLoading(false), 300);
  };

  if (!items.length) {
    return <p className={styles.message}>There are no products yet.</p>;
  }

  return (
    <>
      <div className={styles.cardContainer}>
        {currentItems.map(product => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};
