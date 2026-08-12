import { useLayoutEffect, useMemo, useRef } from 'react';

import { BackLink } from '../../components/BackLink';
import { Button } from '../../components/Button';
import { CartItem } from '../../components/CartItem';
import { CartItemSkeleton } from '../../components/CartItemSkeleton';
import { Loader } from '../../components/Loader';
import { PageMessage } from '../../components/PageMessage';
import { Skeleton } from '../../components/Skeleton';
import { useCartPage, useTranslation } from '../../hooks';
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../../store/cartSlice';
import { useAppDispatch } from '../../store/hooks';
import styles from './CartPage.module.scss';

const LIST_ANIMATION_DURATION = 250;

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const previousPositions = useRef<Map<string, DOMRect>>(new Map());

  const {
    preparedCartItems,
    totalQuantity,
    latestProductYearByCategory,
    skeletonCount,
    shouldShowLoader,
    shouldShowSkeletons,
    shouldShowError,
    shouldShowEmptyCart,
    shouldShowCart,
  } = useCartPage();

  const cartTotalPrice = useMemo(() => {
    return preparedCartItems.reduce((total, { product, quantity }) => {
      const latestProductYear = latestProductYearByCategory[product.category];

      const isBrandNew = product.year === latestProductYear;
      const visiblePrice = isBrandNew ? product.fullPrice : product.price;

      return total + visiblePrice * quantity;
    }, 0);
  }, [preparedCartItems, latestProductYearByCategory]);

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
          duration: LIST_ANIMATION_DURATION,
          easing: 'ease',
        },
      );
    });

    previousPositions.current = nextPositions;
  }, [preparedCartItems]);

  const handleCheckout = () => {
    const shouldClearCart = confirm(t.cart.checkoutConfirm);

    if (shouldClearCart) {
      dispatch(clearCart());
    }
  };

  const setItemRef = (itemId: string) => {
    return (node: HTMLDivElement | null) => {
      if (node) {
        itemRefs.current.set(itemId, node);

        return;
      }

      itemRefs.current.delete(itemId);
    };
  };

  return (
    <div className={styles.page}>
      <BackLink />

      <h1 className={styles.title}>{t.cart.title}</h1>

      {shouldShowLoader && <Loader />}

      {shouldShowSkeletons && (
        <div className={styles.content} aria-busy="true">
          <div className={styles.list}>
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <div className={styles.listItem} key={index}>
                <CartItemSkeleton />
              </div>
            ))}
          </div>

          <aside className={styles.summary} aria-label={t.cart.summary}>
            <Skeleton className={styles.summaryPriceSkeleton} />

            <Skeleton className={styles.summaryTextSkeleton} />

            <div className={styles.divider} />

            <Skeleton className={styles.checkoutSkeleton} />
          </aside>
        </div>
      )}

      {shouldShowError && (
        <PageMessage
          title={t.common.somethingWentWrong}
          text={t.cart.loadError}
          actionText={t.common.reload}
          onAction={() => window.location.reload()}
        />
      )}

      {shouldShowEmptyCart && (
        <PageMessage
          title={t.cart.emptyTitle}
          text={t.cart.emptyText}
          image="img/cart-is-empty.png"
          actionText={t.common.startShopping}
          actionTo="/phones"
        />
      )}

      {shouldShowCart && (
        <div className={styles.content}>
          <div className={styles.list}>
            {preparedCartItems.map(({ product, quantity }) => {
              const latestProductYear =
                latestProductYearByCategory[product.category];

              const isBrandNew = product.year === latestProductYear;

              return (
                <div
                  className={styles.listItem}
                  ref={setItemRef(product.itemId)}
                  key={product.itemId}
                >
                  <CartItem
                    product={product}
                    quantity={quantity}
                    isBrandNew={isBrandNew}
                    onRemove={itemId => dispatch(removeFromCart(itemId))}
                    onIncrease={itemId => dispatch(increaseQuantity(itemId))}
                    onDecrease={itemId => dispatch(decreaseQuantity(itemId))}
                  />
                </div>
              );
            })}
          </div>

          <aside className={styles.summary} aria-label={t.cart.summary}>
            <strong className={styles.totalPrice}>${cartTotalPrice}</strong>

            <p className={styles.totalQuantity}>
              {t.cart.totalFor} {totalQuantity}{' '}
              {totalQuantity === 1 ? t.cart.item : t.cart.items}
            </p>

            <div className={styles.divider} />

            <Button
              fullWidth
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              {t.cart.checkout}
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
};
