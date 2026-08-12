import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { PageMessage } from '../../components/PageMessage';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { useFavoritesPage, useTranslation } from '../../hooks';
import type { ProductFromServer } from '../../types/product';
import styles from './FavoritesPage.module.scss';

const REMOVE_ANIMATION_DURATION = 250;
const GRID_ANIMATION_DURATION = 250;

export const FavoritesPage = () => {
  const t = useTranslation();

  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const previousPositions = useRef<Map<string, DOMRect>>(new Map());
  const removeTimers = useRef<number[]>([]);

  const [renderedProducts, setRenderedProducts] = useState<ProductFromServer[]>(
    [],
  );

  const [removingItemIds, setRemovingItemIds] = useState<Set<string>>(
    () => new Set(),
  );

  const {
    favoriteItemIds,
    searchedFavoriteProducts,
    latestProductYearByCategory,
    skeletonCount,
    shouldShowLoader,
    shouldShowSkeletons,
    shouldShowError,
    shouldShowEmptyFavorites,
    shouldShowEmptySearch,
    shouldShowFavorites,
  } = useFavoritesPage();

  useEffect(() => {
    setRenderedProducts(previousProducts => {
      if (previousProducts.length === 0) {
        return searchedFavoriteProducts;
      }

      const currentProductsMap = new Map(
        searchedFavoriteProducts.map(product => [product.itemId, product]),
      );

      const previousProductIds = new Set(
        previousProducts.map(product => product.itemId),
      );

      const removedProductIds = previousProducts
        .filter(product => !currentProductsMap.has(product.itemId))
        .map(product => product.itemId);

      if (removedProductIds.length > 0) {
        setRemovingItemIds(currentRemovingIds => {
          const nextRemovingIds = new Set(currentRemovingIds);

          removedProductIds.forEach(itemId => {
            nextRemovingIds.add(itemId);
          });

          return nextRemovingIds;
        });

        const timerId = window.setTimeout(() => {
          setRenderedProducts(currentProducts => {
            return currentProducts.filter(product => {
              return !removedProductIds.includes(product.itemId);
            });
          });

          setRemovingItemIds(currentRemovingIds => {
            const nextRemovingIds = new Set(currentRemovingIds);

            removedProductIds.forEach(itemId => {
              nextRemovingIds.delete(itemId);
            });

            return nextRemovingIds;
          });
        }, REMOVE_ANIMATION_DURATION);

        removeTimers.current.push(timerId);
      }

      const updatedPreviousProducts = previousProducts.map(product => {
        return currentProductsMap.get(product.itemId) || product;
      });

      const addedProducts = searchedFavoriteProducts.filter(product => {
        return !previousProductIds.has(product.itemId);
      });

      return [...updatedPreviousProducts, ...addedProducts];
    });
  }, [searchedFavoriteProducts]);

  useLayoutEffect(() => {
    const nextPositions = new Map<string, DOMRect>();

    itemRefs.current.forEach((node, itemId) => {
      nextPositions.set(itemId, node.getBoundingClientRect());
    });

    nextPositions.forEach((nextPosition, itemId) => {
      const previousPosition = previousPositions.current.get(itemId);

      if (!previousPosition) {
        return;
      }

      const deltaX = previousPosition.left - nextPosition.left;
      const deltaY = previousPosition.top - nextPosition.top;

      if (deltaX === 0 && deltaY === 0) {
        return;
      }

      const node = itemRefs.current.get(itemId);

      node?.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px)`,
          },
          {
            transform: 'translate(0, 0)',
          },
        ],
        {
          duration: GRID_ANIMATION_DURATION,
          easing: 'ease',
        },
      );
    });

    previousPositions.current = nextPositions;
  }, [renderedProducts]);

  useEffect(() => {
    const timers = removeTimers.current;

    return () => {
      timers.forEach(timerId => {
        window.clearTimeout(timerId);
      });

      timers.length = 0;
    };
  }, []);

  const setItemRef = (itemId: string) => {
    return (node: HTMLDivElement | null) => {
      if (node) {
        itemRefs.current.set(itemId, node);

        return;
      }

      itemRefs.current.delete(itemId);
    };
  };

  const visibleProducts =
    renderedProducts.length > 0 ? renderedProducts : searchedFavoriteProducts;

  const hasVisibleProducts = visibleProducts.length > 0;

  const skeletonItems = Array.from({ length: skeletonCount }).map(
    (_, index) => <ProductCardSkeleton key={index} />,
  );

  const favoriteItems = visibleProducts.map(product => {
    const isRemoving = removingItemIds.has(product.itemId);

    const latestProductYear = latestProductYearByCategory[product.category];
    const isBrandNew = product.year === latestProductYear;

    return (
      <div
        className={
          isRemoving
            ? `${styles.gridItem} ${styles.gridItemRemoving}`
            : styles.gridItem
        }
        ref={setItemRef(product.itemId)}
        key={product.itemId}
      >
        <ProductCard product={product} isBrandNew={isBrandNew} />
      </div>
    );
  });

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: t.favorites.title,
          },
        ]}
      />

      <h1 className={styles.title}>{t.favorites.title}</h1>

      {shouldShowLoader && <Loader />}

      {shouldShowSkeletons && (
        <>
          <p className={styles.count}>
            {favoriteItemIds.length}{' '}
            {favoriteItemIds.length === 1
              ? t.favorites.item
              : t.favorites.items}
          </p>

          <div className={styles.grid} aria-busy="true">
            {skeletonItems}
          </div>
        </>
      )}

      {shouldShowError && (
        <PageMessage
          title={t.common.somethingWentWrong}
          text={t.favorites.loadError}
          actionText={t.common.reload}
          onAction={() => window.location.reload()}
        />
      )}

      {shouldShowEmptyFavorites && !hasVisibleProducts && (
        <PageMessage
          title={t.favorites.emptyTitle}
          text={t.favorites.emptyText}
          image="img/product-not-found.png"
          actionText={t.common.startShopping}
          actionTo="/phones"
        />
      )}

      {shouldShowEmptySearch && !hasVisibleProducts && (
        <PageMessage
          title={t.favorites.noSearchTitle}
          text={t.favorites.tryAnotherSearch}
        />
      )}

      {(shouldShowFavorites || hasVisibleProducts) && (
        <>
          <p className={styles.count}>
            {searchedFavoriteProducts.length}{' '}
            {searchedFavoriteProducts.length === 1
              ? t.favorites.item
              : t.favorites.items}
          </p>

          <div className={styles.grid}>{favoriteItems}</div>
        </>
      )}
    </div>
  );
};
