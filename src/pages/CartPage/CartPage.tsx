// eslint-disable-next-line import/no-cycle
import { useState, useEffect } from 'react';
import { useCart } from '../../CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import { formatCurrency } from '../../helpers/formatCurrency';
import './CartPage.scss';
import { getItems } from '../../services/fetch';
import { Product } from '../../types/Product';

export const CartPage = () => {
  const { cartItems, cartQuantity } = useCart();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getItems().then(products => setItems(products));
  });

  return (
    <div className="cart">
      <button type="button" className="cart__button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z"
            fill="#313237"
          />
        </svg>
        <p className="cart__button--text">Back</p>
      </button>
      <h1 className="cart__title">Cart</h1>
      <div className="cart__inner">
        <div className="cart__inner--items">
          {cartItems.map((item) => (
            <CartItem id={item.id} quantity={item.quantity} key={item.id} />
          ))}
        </div>

        <div className="cart__total">
          <span className="cart__total--price">
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = items.find((i) => i.id === cartItem.id);

                return total + (item?.price || 0) * cartItem.quantity;
              }, 0),
            )}
          </span>
          <span className="cart__total--text">{`Total for ${cartQuantity} items`}</span>

          <button className="cart__total--button" type="button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
