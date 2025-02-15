import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Product } from '@sTypes/Product';
import { ItemsPerPage } from '@ProductsPage/types/ItemsPerPage';

import { ProductCard } from '@components/ProductCard';
import { ProductCardSkeleton } from '@components/ProductCardSkeleton';

import styles from './ProductsList.module.scss';

import { useHistory } from '@hooks/useHistory';
import { getHeaderHeight } from '@utils/getHeaderHeight';

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

  const lastDiff = useRef(0);
  const lastScroll = useRef(0);
  const lastHeight = useRef<number | null>(null);

  const lastItem = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const item = lastItem.current;
    const list = productsRef.current;
    const prevHeight = lastHeight.current;

    if (!item || !list) {
      return;
    }

    if (prevHeight === null) {
      const prevScroll = lastScroll.current;

      if (
        list.offsetHeight === item.offsetHeight &&
        prevScroll !== window.scrollY
      ) {
        const headerHeight = getHeaderHeight();
        const listTop = list.offsetTop - headerHeight;

        window.scrollTo({
          behavior: 'instant',
          top: listTop,
        });
      } else {
        window.scrollTo({
          behavior: 'instant',
          top: prevScroll,
        });
      }

      return;
    }

    window.scrollTo({
      behavior: 'instant',
      top: item.offsetTop + lastDiff.current,
    });
  });

  const lastItemId = products.length - 1;
  const handleRemoveFromFavorite = useCallback(() => {
    const item = lastItem.current;
    const list = productsRef.current;

    if (item && list) {
      const windowTop = window.scrollY;
      const elementTop = item.offsetTop;

      lastHeight.current = list.offsetHeight;
      lastDiff.current = windowTop - elementTop;
    }
  }, []);

  const saveLastScroll = useCallback(() => {
    lastScroll.current = window.scrollY;
  }, []);

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
          .map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              ref={i === lastItemId ? lastItem : undefined}
              onRemoveFromFavorite={
                i === lastItemId ? handleRemoveFromFavorite : saveLastScroll
              }
            />
          ))}
    </section>
  );
};
