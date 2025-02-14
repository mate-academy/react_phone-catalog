import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Product } from '@sTypes/Product';
import { ItemsPerPage } from '@ProductsPage/types/ItemsPerPage';

import { ProductCard } from '@components/ProductCard';
import { ProductCardSkeleton } from '@components/ProductCardSkeleton';

import { getHistoryStateItem } from '@utils/getHistoryStateItem';
import { setHistoryStateItem } from '@utils/setHistoryStateItem';

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
    <section ref={!isLoading ? productsRef : null}>
      {isLoading && (
        <div className={styles['products-list']}>
          {Array.from(
            { length: getLoadingItemCount(itemsDuringLoading) },
            (_, i) => (
              <ProductCardSkeleton key={i} />
            ),
          )}
        </div>
      )}

      {!isLoading && (
        <TransitionGroup className={styles['products-list']}>
          {products
            .slice(
              page * itemsCount,
              (page + 1) * (pagesCount !== 0 ? itemsCount : visibleCount),
            )
            .map(product => {
              const nodeRef = React.createRef<HTMLDivElement>();

              return (
                <CSSTransition
                  key={product.id}
                  nodeRef={nodeRef}
                  timeout={300}
                  classNames="products-list-item"
                >
                  <ProductCard ref={nodeRef} product={product} />
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      )}
    </section>
  );
};
