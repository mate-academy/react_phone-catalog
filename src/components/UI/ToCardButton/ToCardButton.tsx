import { FC } from 'react';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import './ToCardButton.scss';
import { actions } from '../../../features/cart';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

type Props = {
  width: string;
  height: string;
  product: Product;
};

export const ToCardButton: FC<Props> = ({ width, height, product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const isAdded = cart.some(cartProduct => cartProduct.id === product.id);

  const styles = {
    width,
    height,
  };

  const addCartItem = () => {
    const cartItem = {
      id: product.id,
      quantity: 1,
      product,
    };

    dispatch(actions.add(cartItem));
  };

  const removeCartItem = () => {
    const cartItem = {
      id: product.id,
      quantity: 1,
      product,
    };

    dispatch(actions.remove(cartItem));
  };

  return (
    <button
      type="button"
      className={classNames(
        'to-card-button',
        { 'to-card-button--added': isAdded },
      )}
      style={styles}
      onClick={isAdded ? removeCartItem : addCartItem}
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
