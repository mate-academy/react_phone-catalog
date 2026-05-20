import styles from './AddToCartButton.module.scss';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../types/product';
import { RootState } from '../../redux/store';
import classNames from 'classnames';

type Props = {
  product: Product;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some(item => item.product.id === product.id),
  );

  return (
    <button
      className={classNames(
        isInCart ? `${styles.disabled}` : `${styles.button}`,
      )}
      onClick={() => {
        dispatch(addToCart(product));
      }}
    >
      <p>{isInCart ? 'Added' : 'Add to cart'}</p>
    </button>
  );
};
