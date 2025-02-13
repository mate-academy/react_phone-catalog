import React, { useEffect, useRef, useState } from 'react';

import { Product } from '@sTypes/Product';
import { ItemsPerPage } from '@ProductsPage/types/ItemsPerPage';

import { ProductCard } from '@components/ProductCard';
import { ProductCardSkeleton } from '@components/ProductCardSkeleton';

import { getHistoryStateItem } from '@utils/getHistoryStateItem';
import { setHistoryStateItem } from '@utils/setHistoryStateItem';

import styles from './ProductsList.module.scss';

const VISIBLE_COUNT_PAGINATION = 16;

type Props = {
  isLoading?: boolean;
  products: Product[];

  page: number;
  itemsCount: number;
  pagesCount: number;

  itemsPerPage: ItemsPerPage;
};

export const ProductsList: React.FC<Props> = ({
  isLoading,
  products,

  page,
  itemsCount,
  pagesCount,

  itemsPerPage,
}) => {
  const first = useRef(true);

  const productsRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    getHistoryStateItem<number>('visibleCount') || VISIBLE_COUNT_PAGINATION,
  );

  useEffect(() => {
    if (!first.current) {
      setVisibleCount(VISIBLE_COUNT_PAGINATION);
    }
  }, [itemsCount, products]);

  useEffect(() => {
    first.current = false;
  }, []);

  useEffect(() => {
    const handleGlobalScroll = () => {
      if (productsRef.current) {
        const element = productsRef.current;
        const currentScroll = window.scrollY + window.innerHeight;
        const maxScroll = element.offsetTop + element.offsetHeight * 0.9;

        if (currentScroll >= maxScroll) {
          setVisibleCount(prev => prev + VISIBLE_COUNT_PAGINATION);
        }
      }
    };

    if (itemsPerPage === ItemsPerPage.all && visibleCount <= products.length) {
      document.addEventListener('scroll', handleGlobalScroll);
    }

    return () => document.removeEventListener('scroll', handleGlobalScroll);
  }, [itemsPerPage, products.length, visibleCount]);

  useEffect(() => {
    setHistoryStateItem('visibleCount', visibleCount);
  }, [visibleCount]);

  return (
    <section
      ref={!isLoading ? productsRef : null}
      className={styles['products-list']}
    >
      {isLoading &&
        Array.from({ length: itemsCount || 16 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}

      {!isLoading &&
        products
          .slice(
            page * itemsCount,
            (page + 1) * (pagesCount !== 0 ? itemsCount : visibleCount),
          )
          .map(product => <ProductCard key={product.id} product={product} />)}
    </section>
  );
};
