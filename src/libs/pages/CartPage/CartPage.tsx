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
  const { cartItems: items } = useAppSelector(state => state.cartItems);

  return (
    <div className="cart">
      <div className="cart__back-button">
        <BackButton />
      </div>

      <div className="cart__title">
        <SectionHeader
          title="Cart"
        />
      </div>

      {items.length ? (
        <div className="cart__main">
          <div className="cart__cards">
            {
              items.map(item => (
                <CartItem item={item} key={item.id} />
              ))
            }
          </div>

          {!!items.length && <CartTotal />}
        </div>
      )
        : (
          <NoResults title="Your cart is empty" />
        )}
    </div>
  );
};
