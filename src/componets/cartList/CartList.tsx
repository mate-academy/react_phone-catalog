import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeCheckout,
  openCheckout,
} from '../../redux/reducers/checkoutReducer';
import { openModal } from '../../redux/reducers/modalWindowReducer';
import { CartItemType } from '../../types/CartItemType';
import { CartItem } from '../cartItem/CartItem';
import { CartModal } from '../cartModal/CartModal';
import {
  CheckoutNotification,
} from '../checkoutNotification/CheckoutNotification';

import './CartList.scss';

export const CartList = () => {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const isModalOpen = useAppSelector((state) => state.modal.isModal);
  const isCheckoutSelected = useAppSelector(
    (state) => state.checkout.isCheckout,
  );
  const dispatch = useAppDispatch();

  const totalCount = items.reduce(
    (sum: number, item: CartItemType) => sum + item.count,
    0,
  );

  const handleClearCart = () => {
    dispatch(openModal());
  };

  const handleCheckoutClick = () => {
    dispatch(openCheckout());
    setTimeout(() => {
      dispatch(closeCheckout());
    }, 7000);
  };

  return (
    <div className="cartList">
      <div className="cartList__container">
        {items.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div>
        <div className="cartList__checkout">
          <h1
            className="cartList__total"
            data-cy="productQauntity"
          >
            $
            {totalPrice}
          </h1>
          <p className="cartList__count">
            Total for
            {totalCount}
            items
          </p>
          <div className="cartList__line" />
          {isModalOpen ? (
            <CartModal />
          ) : (
            <div>
              <button
                type="button"
                className="cartList__button"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
              <button
                type="button"
                className="cartList__button"
                onClick={handleClearCart}
              >
                Clear the cart
              </button>
            </div>
          )}
        </div>
        {isCheckoutSelected && <CheckoutNotification />}
      </div>
    </div>
  );
};
