import { useMemo } from 'react';

import { useProducts } from './useProducts';
import { useAppSelector } from '../store/hooks';
import type { ProductCategory, ProductFromServer } from '../types/product';

export type PreparedCartItem = {
  product: ProductFromServer;
  quantity: number;
};

type LatestProductYearByCategory = Record<ProductCategory, number>;

const getInitialLatestProductYearByCategory =
  (): LatestProductYearByCategory => {
    return {
      phones: 0,
      tablets: 0,
      accessories: 0,
    };
  };

const getVisiblePrice = (
  product: ProductFromServer,
  latestProductYearByCategory: LatestProductYearByCategory,
) => {
  const latestProductYear = latestProductYearByCategory[product.category];
  const isBrandNew = product.year === latestProductYear;

  return isBrandNew ? product.fullPrice : product.price;
};

export const useCartPage = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const { products, isLoading, hasError } = useProducts();

  const latestProductYearByCategory = useMemo(() => {
    return products.reduce<LatestProductYearByCategory>(
      (yearsByCategory, product) => {
        const currentLatestYear = yearsByCategory[product.category];

        if (product.year > currentLatestYear) {
          return {
            ...yearsByCategory,
            [product.category]: product.year,
          };
        }

        return yearsByCategory;
      },
      getInitialLatestProductYearByCategory(),
    );
  }, [products]);

  const preparedCartItems = useMemo(() => {
    return cartItems
      .map(cartItem => {
        const product = products.find(item => item.itemId === cartItem.itemId);

        if (!product) {
          return null;
        }

        return {
          product,
          quantity: cartItem.quantity,
        };
      })
      .filter((item): item is PreparedCartItem => {
        return item !== null;
      });
  }, [cartItems, products]);

  const totalQuantity = preparedCartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const totalPrice = preparedCartItems.reduce((sum, item) => {
    const visiblePrice = getVisiblePrice(
      item.product,
      latestProductYearByCategory,
    );

    return sum + visiblePrice * item.quantity;
  }, 0);

  const skeletonCount = Math.min(cartItems.length, 4);

  const shouldShowLoader = isLoading && cartItems.length === 0;

  const shouldShowSkeletons = isLoading && cartItems.length > 0;

  const shouldShowError = !isLoading && hasError;

  const shouldShowEmptyCart =
    !isLoading && !hasError && preparedCartItems.length === 0;

  const shouldShowCart =
    !isLoading && !hasError && preparedCartItems.length > 0;

  return {
    preparedCartItems,
    totalQuantity,
    totalPrice,
    latestProductYearByCategory,
    skeletonCount,
    shouldShowLoader,
    shouldShowSkeletons,
    shouldShowError,
    shouldShowEmptyCart,
    shouldShowCart,
  };
};
