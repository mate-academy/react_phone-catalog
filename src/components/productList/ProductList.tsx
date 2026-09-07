import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

import { AllProduct } from '../../types/UnionType';

import { useAppSelector } from '../../utils/hooks';

import styles from './ProductList.module.scss';

import { Card } from '../Card';
import { CardSkeleton } from '../CardSkeleton';

interface Props {
  products: AllProduct[];
  loader: boolean;
}

export const ProductList: React.FC<Props> = ({ products, loader }) => {
  const favoritesIds = useAppSelector(state => state.favorites.data).map(
    (item: AllProduct) => ('itemId' in item ? item.itemId : item.id),
  );
  const cartIds = useAppSelector(state => state.cart.data).map(
    ({ item }: { item: AllProduct }) =>
      'itemId' in item ? item.itemId : item.id,
  );

  const [searchParams] = useSearchParams();

  const [itemOffset, setItemOffset] = useState(10);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);

  const updatePageRange = () => {
    const width = window.innerWidth;

    if (width >= 1200) {
      setPageRangeDisplayed(6);
    } else if (width >= 640) {
      setPageRangeDisplayed(4);
    } else {
      setPageRangeDisplayed(2);
    }
  };

  useEffect(() => {
    updatePageRange();
    window.addEventListener('resize', updatePageRange);

    return () => window.removeEventListener('resize', updatePageRange);
  }, []);
  const itemsPerPage = +(searchParams.get('perPage') || 0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = itemsPerPage
    ? products.slice(itemOffset, endOffset)
    : products;
  const pageCount = Math.ceil(products.length / (itemsPerPage || 0)) || 0;

  const handlePageClick = (event: { selected: number }) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    const newOffset = (event.selected * (itemsPerPage || 0)) % products.length;

    setItemOffset(newOffset);
  };

  return (
    <div className={styles.productList}>
      <div className={styles.productList__grid}>
        {loader &&
          Array(16)
            .fill(0)
            .map((_, i) => <CardSkeleton key={i} />)}
        {!loader &&
          currentItems.map(product => {
            return (
              <Card
                key={product.id}
                card={product}
                showSale={true}
                favorite={favoritesIds.includes(
                  'itemId' in product ? product.itemId : product.id,
                )}
                cart={cartIds.includes(
                  'itemId' in product ? product.itemId : product.id,
                )}
              />
            );
          })}
      </div>
      {itemsPerPage && (
        <ReactPaginate
          breakLabel={'...'}
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageRangeDisplayed}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel=""
          containerClassName={styles.pagination}
          pageClassName={styles.pagination__page}
          activeClassName={styles.pagination__active}
          previousClassName={styles.pagination__previous}
          nextClassName={styles.pagination__next}
        />
      )}
    </div>
  );
};
