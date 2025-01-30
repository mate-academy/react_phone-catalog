import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hook';
import { addCart, removeCart } from '../../features/cart';
import classNames from 'classnames';
import style from './ButtonAddCart.module.scss';

type Props = {
  productId: string;
  className?: string;
};
export const ButtonAddCart: React.FC<Props> = ({ productId, className }) => {
  const dispatch = useDispatch();
  const cartProductId = useAppSelector(state => state.cart.products);
  const isActive = cartProductId.some(item => item.id === productId);

  const toggleCart = () => {
    if (isActive) {
      dispatch(removeCart(productId));
    } else {
      dispatch(addCart(productId));
    }
  };

  return (
    <button
      key={productId}
      className={classNames(style.addToCart, className, {
        [style.buttonActive]: isActive,
      })}
      onClick={toggleCart}
    >
      {isActive ? 'Selected' : 'Add to cart'}
    </button>
  );
};
