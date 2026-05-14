import { Link } from 'react-router-dom';
import type { Cart } from '../../../../types/Cart';
import s from './CartItem.module.scss';
import { useContext } from 'react';
import { CartContext } from '../../../../CartContext';
import { SliderButton } from '../../../shared/SliderButton';

type Props = {
  cartItem: Cart;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { setCart } = useContext(CartContext);

  return (
    <div className={s.cartItem}>
      <div className={s.cartItem__firstRow}>
        <button
          className={s.cartItem__delButton}
          onClick={() =>
            setCart(prev => [...prev].filter(item => item.id !== cartItem.id))
          }
        >
          <img src="./img/icons/close.svg" alt="" />
        </button>
        <Link to={`/product/${cartItem.id}`}>
          <img
            src={'./' + cartItem.product.image}
            className={s.cartItem__img}
            alt="image"
          />
        </Link>
        <Link to={`/product/${cartItem.id}`} className={s.cartItem__name}>
          {cartItem.product.name}
        </Link>
      </div>
      <div className={s.cartItem__secondRow}>
        <div className={s.cartItem__counter}>
          <SliderButton
            direction="minus"
            disabled={cartItem.quantity <= 1}
            onClick={() =>
              setCart(prev =>
                prev.map(item =>
                  item.id === cartItem.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
                ),
              )
            }
          />
          <div>{cartItem.quantity}</div>
          <SliderButton
            direction="plus"
            onClick={() =>
              setCart(prev =>
                prev.map(item =>
                  item.id === cartItem.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                ),
              )
            }
          />
        </div>
        <div className={s.cartItem__price}>${cartItem.product.price}</div>
      </div>
    </div>
  );
};
