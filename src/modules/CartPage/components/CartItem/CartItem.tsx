/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC } from 'react';
import { CartProduct } from '../../../../types/Cart';
import remove from '../../../../assets/images/icons/remove.svg';
import minus from '../../../../assets/images/icons/minus.svg';
import plus from '../../../../assets/images/icons/plus.svg';
import s from './CartItem.module.scss';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../../../context/CartContext';

interface Props {
  item: CartProduct;
}

export const CartItemBlock: FC<Props> = ({ item }) => {
  const { removeFromCart, incrementQuantity, decrementQuantity } =
    useCartContext();

  return (
    <div className={s.cartItem}>
      <div className={s.infoBlock}>
        <img
          className={s.removeIcon}
          src={remove}
          alt="Remove Item"
          onClick={() => removeFromCart(item.product.itemId)}
        />
        <div className={s.imageBlock}>
          <Link to={`/product/${item.product.itemId}`}>
            <img
              className={s.productImage}
              src={item.product.image}
              alt={item.product.name}
              onClick={() => console.log(item.id)}
            />
          </Link>
        </div>
        <div className={s.productName}>
          <Link to={`/product/${item.product.itemId}`}>
            {item.product.name}
          </Link>
        </div>
      </div>
      <div className={s.quantityPriceBlock}>
        <div className={s.quantityBlock}>
          <button
            type="button"
            className={s.quantityButton}
            disabled={item.quantity <= 1}
            onClick={() => decrementQuantity(item.product.itemId)}
          >
            <img src={minus} alt="Decrement" />
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            className={s.quantityButton}
            onClick={() => incrementQuantity(item.product.itemId)}
          >
            <img src={plus} alt="Increment" />
          </button>
        </div>
        <div className={s.priceBlock}>
          ${item.product.price * item.quantity}
        </div>
      </div>
    </div>
  );
};
