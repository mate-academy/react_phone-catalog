import React, { useEffect, useRef, useState } from 'react';

import { Product } from '@sTypes/Product';
import { ItemsPerPage } from '@ProductsPage/types/ItemsPerPage';

import { ProductCard } from '@components/ProductCard';
import { ProductCardSkeleton } from '@components/ProductCardSkeleton';

import { useHistory } from '@hooks/useHistory';
import styles from './ProductsList.module.scss';

const VISIBLE_COUNT_PAGINATION = 16;

const ITEM_MIN_WIDTH = 272;
const MAX_LIST_WIDTH = 1136;

function getLoadingItemCount(itemsDuringLoading: number | undefined) {
  return itemsDuringLoading !== undefined
    ? itemsDuringLoading
    : Math.floor(Math.min(window.innerWidth, MAX_LIST_WIDTH) / ITEM_MIN_WIDTH);
}

type Props = {
  products: Product[];
  isLoading?: boolean;
  itemsDuringLoading?: number;

  page?: number;
  itemsCount?: number;
  pagesCount?: number;

  itemsPerPage?: ItemsPerPage;
};

export const ProductsList: React.FC<Props> = ({
  products,
  isLoading,
  itemsDuringLoading,

  page = 0,
  itemsCount = products.length,
  pagesCount = 0,

  itemsPerPage = ItemsPerPage.all,
}) => {
  const first = useRef(true);
  const { getHistoryItem, setHistoryItem } = useHistory();

  const productsRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(
    getHistoryItem<number>('visibleCount') || VISIBLE_COUNT_PAGINATION,
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
    setHistoryItem('visibleCount', visibleCount);
  }, [setHistoryItem, visibleCount]);

  return (
    <section
      ref={!isLoading ? productsRef : null}
      className={styles['products-list']}
    >
      {isLoading &&
        Array.from(
          { length: getLoadingItemCount(itemsDuringLoading) },
          (_, i) => <ProductCardSkeleton key={i} />,
        )}

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
