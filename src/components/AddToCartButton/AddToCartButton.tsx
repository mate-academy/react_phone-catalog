import classNames from 'classnames';
import styles from './AddToCartButton.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cartProductsSlice } from '../../features/cartProducts';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const cart = useAppSelector(state => state.cartProducts);

  const dispatch = useAppDispatch();

  const isInCart = cart.items.some(item => item.id === product.id);

  const handleToggleProduct = () => {
    if (isInCart) {
      dispatch(
        cartProductsSlice.actions.removeProduct({
          id: product.id,
        }),
      );
    } else {
      dispatch(
        cartProductsSlice.actions.addProduct({
          id: product.id,
          product: product,
          quantity: 1,
        }),
      );
    }
  };

  return (
    <button
      type="button"
      className={classNames(styles.add_to_cart_button, {
        [styles.added_to_cart_button]: isInCart,
      })}
      onClick={handleToggleProduct}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
