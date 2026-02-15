import classNames from 'classnames';
import { useMemo } from 'react';

import { Image } from '@components/Image';
import { Error } from '@components/Error/Error';
import { CartList } from './components/CartList';
import { Checkout } from './components/Checkout';
import { BackButton } from '@components/BackButton';

import { Product } from '@sTypes/Product';
import { ProductCart } from './types/ProductCart';

import { useAppSelector } from '@store/hooks';
import { useProductsPreload } from '@hooks/useProductsPreload';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { itemIds, length } = useAppSelector(state => state.cart);
  const { products, isLoading, error, reload } = useProductsPreload();

  const allProducts: Product[] = useMemo(() => {
    return Object.values(products).flat(Infinity);
  }, [products]);

  const cartProducts = useMemo(() => {
    const result: ProductCart[] = [];

    Object.entries(itemIds).forEach(([itemId, count]) => {
      const foundProduct = allProducts.find(
        product => product.itemId === itemId,
      );

      if (foundProduct) {
        result.push({
          count,
          product: foundProduct,
        });
      }
    });

    return result;
  }, [allProducts, itemIds]);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce(
      (sum, { count, product }) => sum + count * product.price,
      0,
    );
  }, [cartProducts]);

  const hasContent = length !== 0;

  const showError = hasContent && error;
  const showLoader = hasContent && isLoading;
  const showContent = hasContent && !showLoader && !showError;

  return (
    <div className={styles['cart-page']}>
      <BackButton />

      <div className={styles['cart-page__content']}>
        <h1 className={styles['cart-page__title']}>Cart</h1>

        {!hasContent && (
          <Image
            src="./img/cart-is-empty.png"
            className={classNames(
              styles['cart-page__message'],
              styles['cart-page__message--image'],
            )}
          />
        )}

        {showError && (
          <Error
            error={error}
            reload={reload}
            className={styles['cart-page__message']}
          />
        )}

        {(showLoader || showContent) && (
          <CartList
            itemsCount={length}
            products={cartProducts}
            className={styles['cart-page__cart-list']}
          />
        )}

        <Checkout
          itemsCount={length}
          totalPrice={totalPrice}
          className={styles['cart-page__checkout']}
        />
      </div>
    </div>
  );
};
