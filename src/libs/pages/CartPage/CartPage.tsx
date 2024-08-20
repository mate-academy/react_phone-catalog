import { useAppSelector } from '../../app/hooks';

import {
  BackButton,
  SectionHeader,
  CartItem,
  CartTotal,
  NoResults,
} from '../../components';

import './CartPage.scss';

export const CartPage = () => {
  const { cartItems } = useAppSelector(state => state.cartItems);

  return (
    <div className="cart">
      <div className="cart__back-button">
        <BackButton />
      </div>

      <div className="cart__title">
        <SectionHeader title="Cart" />
      </div>

      {cartItems.length ? (
        <div className="cart__main">
          <div className="cart__cards">
            {cartItems.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          {!!cartItems.length && <CartTotal />}
        </div>
      ) : (
        <NoResults title="Your cart is empty" />
      )}
    </div>
  );
};
