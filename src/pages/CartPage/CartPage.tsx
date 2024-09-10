import { useAppSelector } from '../../hooks';

import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';
import { Total } from '../../components/TotalAmount';

import styles from './CartPage.module.scss';
const {
  cart,
  cart__buttonWrapper,
  cart__title,
  cart__items,
  cart__total,
  cart__emptyText,
} = styles;

export const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  const cartNotEmpty = !!cartItems.length;

  return (
    <div className={cart}>
      <div className={cart__buttonWrapper}>
        <BackButton />
      </div>

      <h1 className={cart__title}>Cart</h1>

      {cartNotEmpty && (
        <>
          <div className={cart__items}>
            {cartItems.map((item, index) => (
              <CartItem key={index} product={item.product} />
            ))}
          </div>

          <div className={cart__total}>
            <Total />
          </div>
        </>
      )}

      {!cartNotEmpty && <p className={cart__emptyText}>Your cart is empty</p>}
    </div>
  );
};
