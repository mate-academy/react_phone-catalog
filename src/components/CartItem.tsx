import classNames from 'classnames';
import { useState } from 'react';
import { Phone } from './ProductCard';

type Props = {
  item: Phone,
  handleCart: (id: string) => void,
  changeQuantity: (type: string, price: number) => void,
};

export const CartItem: React.FC<Props> = ({
  item,
  handleCart,
  changeQuantity,
}) => {
  const [quantity, setQuantity] = useState(1);

  const totalPrice: number = item.discount !== 0
    ? Math.floor(item.price - (item.price * (item.discount / 100)))
    : item.price;

  return (
    <div className="cart-item__cell">
      <button
        type="button"
        className="cart-item__close"
        onClick={() => {
          handleCart(item.id);
        }}
      >
        { }
      </button>
      <img src={item.imageUrl} alt={item.name} className="cart-item__image" />
      <div className="cart-item__description">{item.name}</div>
      <div className="cart-item__buttons">
        <button
          type="button"
          className={classNames('cart-item__button cart-item__button--minus',
            { 'cart-item__button--disabled': quantity === 1 })}
          onClick={() => {
            setQuantity(prev => (
              quantity === 1 ? 1 : prev - 1
            ));
            changeQuantity('-', quantity === 1 ? 0 : totalPrice);
          }}
        >
          { }
        </button>
        <div className="cart-item__quantity">
          {quantity}
        </div>
        <button
          type="button"
          className="cart-item__button cart-item__button--plus"
          onClick={() => {
            setQuantity(prev => (
              prev + 1
            ));
            changeQuantity('+', totalPrice);
          }}
        >
          { }
        </button>
      </div>
      <div className="cart-item__price">
        {`$${(totalPrice * quantity).toString()}`}
      </div>
    </div>
  );
};
