import styles from './AddToCart.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { FC } from 'react';
import { cartSlice } from '../../../../features/cart/cartSlice';
import products from './../../../../../public/api/products.json';
import { Product } from '../../../../types/Product';

type Props = {
  productId?: string;
};

export const AddToCart: FC<Props> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const added = useAppSelector(state => state.cart);

  const currentProduct = products.find(
    product => product.itemId === productId,
  ) as Product;

  const isAdded = added.some(product => product.id === currentProduct.itemId);

  const productForCard = {
    id: currentProduct.itemId,
    title: currentProduct.name,
    image: currentProduct.image,
    price: currentProduct.price,
    count: 1,
  };

  return (
    <button
      onClick={() => {
        if (!isAdded) {
          dispatch(cartSlice.actions.addProductToCart(productForCard));
        } else {
          dispatch(cartSlice.actions.removeProductFromCart(productForCard));
        }
      }}
      className={isAdded ? styles.cartAdded : styles.cart}
    >
      {isAdded ? 'Remove from cart' : 'Add to cart'}
    </button>
  );
};
