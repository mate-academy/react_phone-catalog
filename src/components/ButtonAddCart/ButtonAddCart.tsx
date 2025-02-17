import './ButtonAddCart.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { addCart } from '../../features/cart';

type Props = {
  productId: string;
};

export const ButtonAddCart: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();
  const cartProductIds = useAppSelector(state => state.cart.products);
  const isActive = cartProductIds.some(item => item.id === productId);

  const addToCart = () => {
    if (!isActive) {
      dispatch(addCart(productId));
    }

    return;
  };

  return (
    <button
      key={productId}
      className={classNames('add-to-cart', {
        'added-to-cart': isActive,
      })}
      onClick={addToCart}
    >
      {!isActive ? 'Add to cart' : 'Added to cart'}
    </button>
  );
};
