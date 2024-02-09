import React, { useEffect, useMemo, useRef } from 'react';
import { CartProduct } from '../../../definitions/types/Product';

import './CartList.scss';
import CartProductItem from '../CartProductItem';
import { useAppDispatch, useAppSelector } from '../../../store/redux/hooks';
import { cartActions, cartSelector } from '../../../store/redux/slices/cartSlice';

export const CartList: React.FC = () => {
  const { storageProducts, products, loading } = useAppSelector(cartSelector.selectState);
  const isInitialized = useRef(false);
  const dispatch = useAppDispatch();

  const cartProducts: CartProduct[] = useMemo(() => {
    return products.map(product => {
      const thisStorageProduct = storageProducts.find(
        storageProduct => storageProduct.id === product.itemId,
      );
      const amountOfProduct = thisStorageProduct?.amount ?? 0;

      return {
        id: product.itemId,
        category: product.category,
        name: product.name,
        price: product.price,
        image: product.image,
        amount: amountOfProduct,
      };
    });
  }, [products, storageProducts]);

  const showedItems = loading && !isInitialized.current
    ? Array.from({ length: storageProducts.length }, () => null)
    : cartProducts;

  useEffect(() => {
    dispatch(cartActions.display({})).then(() => {
      isInitialized.current = true;
    });
  }, [dispatch]);

  const removeProduct = (id: string) => () => {
    dispatch(cartActions.removeProduct(id));
    dispatch(cartActions.display({}));
  };

  const increaseAmount = (id: string) => () => {
    dispatch(cartActions.amountIncrease(id));
  };

  const decreaseAmount = (id: string) => () => {
    dispatch(cartActions.amountDecrease(id));
  };

  return (
    <section className="cart-list">
      {showedItems.map((product, index) => (
        <CartProductItem
          key={product?.id ?? index}
          product={product}
          onRemove={product?.id ? removeProduct(product.id) : undefined}
          onAmountIncrease={product?.id ? increaseAmount(product.id) : undefined}
          onAmountDecrease={product?.id ? decreaseAmount(product.id) : undefined}
        />
      ))}
    </section>
  );
};
