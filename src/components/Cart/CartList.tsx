import { FC, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import { CartItem } from './CartItem';
import { formatter } from '../../helper';
import { ICartProduct } from '../../types';

import './CartList.scss';

type Props = {
  productCart: ICartProduct[],
};

export const CartList: FC<Props> = ({ productCart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const totalPrice = productCart.reduce((acc, val) => {
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
          {productCart.map((product) => (
            <li key={product.itemId} className="cart__item">
              <CartItem product={product} />
            </li>
          ))}
        </ul>
        <div className="cart__wrapper">
          <div className="cart__price">
            <h2>{formatter.format(totalPrice)}</h2>
            <p
              className="cart__description"
            >
              {`Total for ${productCart.length} ${productCart.length === 1 ? 'item' : 'items'}`}
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
