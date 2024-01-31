import { FC } from 'react';
import { IPhone } from '../../types/Phone.interface';
import { CartItem } from './CartItem';
import './CartList.scss';
import { formatter } from '../../helper/formater';

type Props = {
  phoneCart: IPhone[],
};

export const CartList: FC<Props> = ({ phoneCart }) => {
  const totalPrice = phoneCart.reduce((acc, val) => {
    return acc + (val.price * val.quantity);
  }, 0);

  return (
    <div className="cart">
      <ul className="cart__list">
        {phoneCart.map((phone) => (
          <li key={phone.phoneId} className="cart__item">
            <CartItem phone={phone} />
          </li>
        ))}
      </ul>
      <div className="cart__price">
        <h1>{formatter.format(totalPrice)}</h1>
        <p
          className="cart__description"
        >
          {`Total for ${phoneCart.length} ${phoneCart.length === 1 ? 'item' : 'items'}`}
        </p>
        <button
          type="button"
          className="cart__button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
