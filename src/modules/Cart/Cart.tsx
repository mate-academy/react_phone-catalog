import scss from './Cart.module.scss';
import { ButtonBack } from '../shared/components/ButtonBack';
import { CartItem } from './components/CartItem';
import { StorageCartItem } from '../../api/types';
import { Total } from './components/CartItem/Total';

interface Props {
  items: StorageCartItem[];
}

export const Cart: React.FC<Props> = ({ items }) => {
  const totalItems = items.length;
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <section className={scss.cart}>
      <ButtonBack />
      <h1 className={scss.cart__title}>Cart</h1>
      <div className={scss.cart__itemWrapper}>
        {items.length > 0 ? (
          <>
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            <Total totalItems={totalItems} totalPrice={totalPrice} />
          </>
        ) : (
          <span className={scss.cart__emptyCart}>Your cart is empty</span>
        )}
      </div>
    </section>
  );
};
