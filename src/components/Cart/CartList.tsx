import { FC, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import { CartItem } from './CartItem';
import { formatter } from '../../helper';
import { ICartPhone } from '../../types';

import './CartList.scss';

type Props = {
  phoneCart: ICartPhone[],
};

export const CartList: FC<Props> = ({ phoneCart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const totalPrice = phoneCart.reduce((acc, val) => {
    return acc + (val.price * val.quantity);
  }, 0);

  const handleVisible = () => {
    setIsVisible(x => !x);
  };

  return (
    <>
      {isVisible && (
        <TypeAnimation
          sequence={[
            'We are sorry, but this feature is not implemented yet!',
            1000,
          ]}
          style={{
            fontSize: '2em',
            display: 'flex',
            fontWeight: '700',
            marginBlock: '20px',
            color: '#313237',
          }}
        />
      )}

      <div className="cart">
        <ul className="cart__list">
          {phoneCart.map((phone) => (
            <li key={phone.itemId} className="cart__item">
              <CartItem phone={phone} />
            </li>
          ))}
        </ul>
        <div className="cart__wrapper">
          <div className="cart__price">
            <h2>{formatter.format(totalPrice)}</h2>
            <p
              className="cart__description"
            >
              {`Total for ${phoneCart.length} ${phoneCart.length === 1 ? 'item' : 'items'}`}
            </p>
            <button
              type="button"
              className="cart__button"
              onClick={handleVisible}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
