import { Card } from '../../shared/Card/Card';
import { Product } from '../../../type/Product';
import { Controls } from '../Controls/Controls';
import styles from './CatalogLayout.module.scss';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../GlobalContext/GlobalContext';

type Props = {
  products: Product[];
};

export const CatalogLayout: React.FC<Props> = ({ products }) => {
  const { isSunSelected } = useContext(GlobalContext);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);

  const pagesPerGroup = 4;

  useEffect(() => {
    setSortedProducts([...products].sort((a, b) => b.year - a.year));
  }, [products]);

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = sortedProducts.slice(
    itemsPerPage === 'all' ? 0 : (currentPage - 1) * itemsPerPage,
    itemsPerPage === 'all' ? sortedProducts.length : currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(
    sortedProducts.length / (itemsPerPage as number),
  );

  const startPage = currentPaginationGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  useEffect(() => {
    setCurrentPage(1);

    setCurrentPaginationGroup(0);
  }, [itemsPerPage, pagesPerGroup]);

  return (
    <div className={styles.catalog}>
      <div className={styles.catalog__wrapper}>
        <Controls
          products={products}
          setSortedProducts={setSortedProducts}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className={styles.catalog__products}>
          {paginatedProducts.map(product => (
            <Card
              key={product.id}
              product={product}
              category={product.category}
            />
          ))}
        </div>

        {itemsPerPage !== 'all' && (
          <div className={styles.catalog__pagination}>
            <button
              className={classNames(styles.catalog__pagination_prev, {
                [styles.catalog__pagination_prev_dark]: !isSunSelected,
              })}
              onClick={() => {
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                  if (currentPage - 1 < startPage) {
                    setCurrentPaginationGroup(currentPaginationGroup - 1);
                  }
                }
              }}
              disabled={currentPage === 1}
            ></button>

            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(startPage + index)}
                className={classNames(styles.catalog__pagination_number, {
                  [styles.catalog__pagination_number_dark]: !isSunSelected,
                  [styles.catalog__pagination_number_active]:
                    startPage + index === currentPage,
                  [styles.catalog__pagination_number_active_dark]:
                    startPage + index === currentPage && !isSunSelected,
                })}
              >
                {startPage + index}
              </button>
            ))}

            <button
              className={classNames(styles.catalog__pagination_next, {
                [styles.catalog__pagination_next_dark]: !isSunSelected,
              })}
              onClick={() => {
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                  if (currentPage + 1 > endPage) {
                    setCurrentPaginationGroup(currentPaginationGroup + 1);
                  }
                }
              }}
              disabled={currentPage === totalPages}
            ></button>
          </div>
        )}
      </div>
    </div>
  );
};
