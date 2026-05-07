import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { capitalizeFirstLetter } from '../../utils/string';
import { Back } from '../shared/Back';
import { CartItem } from './components';
import s from './CartPage.module.scss';
import { Line } from '../shared/Line';
import { PrimaryButton } from '../shared/PrimaryButton';

export const CartPage = () => {
  const { pathname } = useLocation();
  const { cart } = useContext(CartContext) || { cart: [] };
  const type = pathname.slice(1);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalAmount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={s.cart}>
      <Back />

      {cart.length > 0 ? (
        <>
          <h1 className={s.cart__title}>{capitalizeFirstLetter(type)}</h1>
          <div className={s.cart__content}>
            <div className={s.cart__list}>
              {cart.map(item => (
                <CartItem key={item.product.id} cartItem={item} />
              ))}
            </div>

            <div className={s.cart__total}>
              <div className={s.cart__totalContent}>
                <div className={s.cart__totalPriceAmount}>
                  <div className={s.cart__totalPrice}>${totalPrice}</div>
                  <div className={s.cart__totalAmount}>
                    Total for {totalAmount} items
                  </div>
                </div>
                <Line />
                <div className={s.cart__totalButton}>
                  <PrimaryButton>Checkout</PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <img
          src="./img/cart-is-empty.png"
          className={s.cart__isEmpty}
          alt="cart-is-empty"
        />
      )}
    </div>
  );
};
