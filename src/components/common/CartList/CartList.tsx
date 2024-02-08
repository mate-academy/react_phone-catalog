import React, { useEffect, useMemo } from 'react';
import { CartProduct } from '../../../definitions/types/Product';

import './CartList.scss';
import CartProductItem from '../CartProductItem';
import { useAppDispatch, useAppSelector } from '../../../store/redux/hooks';
import { cartActions, cartSelector } from '../../../store/redux/slices/cartSlice';

export const CartList: React.FC = () => {
  const { storageProducts, products } = useAppSelector(cartSelector.selectState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartActions.display({}));
  }, [dispatch]);

  const removeProduct = (id: string) => () => {
    dispatch(cartActions.removeProduct(id));
    dispatch(cartActions.display({}));
  };
  
  const increaseAmount = (id: string) => () => {
    dispatch(cartActions.amountIncrease(id));
  }
  const decreaseAmount = (id: string) => () => {
    dispatch(cartActions.amountDecrease(id));
  }

  const cartProducts: CartProduct[] = useMemo(() => {
    return products.map(product => {
      const thisStorageProduct = storageProducts.find(storageProduct => storageProduct.id === product.itemId);
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

  return (
    <section className='cart-list'>
      {cartProducts.map(product => (
        <CartProductItem
          key={product.id}
          product={product}
          onRemove={removeProduct(product.id)}
          onAmountIncrease={increaseAmount(product.id)}
          onAmountDecrease={decreaseAmount(product.id)}
        />
      ))}
    </section>
  );
};
