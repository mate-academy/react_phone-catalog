import React from 'react';
import { Product } from '../../types/types';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination/Pagination';

type Props = {
  itemsPerPage: number;
  items: Product[];
};

export const ProductList: React.FC<Props> = ({ itemsPerPage, items }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = searchParams.get('page');
  const itemOffset = initialPage ? (+initialPage * itemsPerPage) % items.length : 0;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = itemsPerPage > 16 ? 0 : Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (value: number) => {
    if (+value > 0) {
      const params = new URLSearchParams(searchParams);
      params.set('page', (value + 1).toString());
      setSearchParams(params);
    }
    if (+value === 0) {
      const params = new URLSearchParams(searchParams);
      params.delete('page');
      setSearchParams(params);
    }
  };

  return (
    <>
      <div className={styles.productsList}>
        {currentItems &&
          currentItems.map((item: Product, idx: number) => (
            <div className={styles.itemCard} key={`${item.id}-${idx}`}>
              <ProductCard product={item} />
            </div>
          ))}
      </div>
      {items.length > 0 && (
        <Pagination pageCount={pageCount} initialPage={initialPage} onChange={handlePageClick} />
      )}
    </>
  );
};
