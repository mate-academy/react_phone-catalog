import { useEffect, useMemo, useState } from 'react';
import styles from './ProductsList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../../../shared/components/Pagination';
import { Product } from '../../../../types/types';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Loader } from '../../../shared/components/Loader';

type Props = {
  itemsPerPage: number;
  items: Product[];
};

export const ProductsList: React.FC<Props> = ({ itemsPerPage, items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [isParamsChanged, setIsParamsChanged] = useState(false);

  const [currentPage, setCurrentPage] = useState(initialPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [itemsPerPage, items.length],
  );

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');

  useEffect(() => {
    setIsParamsChanged(true);

    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);

    params.delete('page');
    setSearchParams(params);

    setTimeout(() => {
      setIsParamsChanged(false);
    }, 300);
  }, [sort, perPage, searchParams, setSearchParams]);

  const handlePageClick = (page: number) => {
    setIsParamsChanged(true);
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams);

    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }

    setSearchParams(params);

    setTimeout(() => {
      setIsParamsChanged(false);
    }, 300);
  };

  return (
    <>
      {isParamsChanged ? (
        <Loader />
      ) : (
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
              <Pagination
                pageCount={totalPages}
                currentPage={currentPage}
                onChange={handlePageClick}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
