import { useMemo, useState } from 'react';
import styles from './ProductsList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../shared/components/Pagination';
import { Product } from '../../../../types/types';
import { ProductCard } from '../../../shared/components/ProductCard';

type Props = {
  itemsPerPage: number;
  items: Product[];
};

export const ProductsList: React.FC<Props> = ({ itemsPerPage, items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [itemsPerPage, items.length],
  );

  const handlePageClick = (page: number) => {
    setTimeout(() => {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams);

      if (page > 1) {
        params.set('page', page.toString());
      } else {
        params.delete('page');
      }

      setSearchParams(params);
    }, 300);
  };

  return (
    <>
      <div className={styles.productsList}>
        {currentItems &&
          currentItems.map(item => (
            <div className={styles.itemCard} key={item.id}>
              <ProductCard product={item} />
            </div>
          ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination pageCount={totalPages} currentPage={currentPage} onChange={handlePageClick} />
        </div>
      )}
    </>
  );
};
