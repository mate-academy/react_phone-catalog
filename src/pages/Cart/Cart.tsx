import './Cart.scss';

import { BackLinkButton } from '../../components/Elements/BackLinkButton';
import { useMemo, useState } from 'react';
import { CartElement } from './components/CartElement';
import { CartModal } from './components/CartModal';
import { useAppContext } from '../../store/store';

export const CartPage = () => {
  const {
    state: { cart },
    methods: { handleClearCart },
  } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.count, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.count, 0);
  }, [cart]);

  const handleConfirm = () => {
    handleClearCart();
    setShowModal(false);
  };

  return (
    <div className="cart">
      <BackLinkButton />

      <h1 className="cart__title">Cart</h1>

      {!cart.length ? (
        <div className="cart--empty" />
      ) : (
        <div className="cart__content">
          <div className="cart__items">
            {cart.map(item => (
              <CartElement key={item.id} data={item} />
            ))}
          </div>

          <div className="cart__checkout">
            <div className="cart__total">
              <span className="cart__total-price">{`$${totalPrice}`}</span>
              <span className="cart__total-text">
                Total for {totalAmount} items
              </span>
            </div>

            <span className="cart__divider"></span>

            <button
              className="buttons cart__checkout-button"
              onClick={() => setShowModal(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      <CartModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};
