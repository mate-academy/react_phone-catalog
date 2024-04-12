import { useState } from 'react';
import { CartProductList } from '../../components/CartProductList';
import './cartPage.scss';
import { Checkout } from '../../components/Checkout';
import { BackButton } from '../../components/BackButton';
import { useAppSelector } from '../../app/hooks';
import { Modal } from '../../components/Modal/Modal';

export const CartPage = () => {
  // const { cartProducts } = useContext(CartContext);
  const [modalActive, setModalActive] = useState(false);
  const cart = useAppSelector(state => state.cart);

  return (
    <div className="cartPage">
      <BackButton />

      {cart.cartItems.length === 0 ? (
        <h1 className="cartPage__title">Your cart is empty</h1>
      ) : (
        <>
          <h1 className="cartPage__title">Cart</h1>
          <div className="grid">
            <div className="
          grid__item
          grid__item--1-4
          grid__item--desktop-1-16
          grid__item--tablet-1-12"
            >
              <CartProductList />
            </div>

            <div
              className="
            grid__item
            grid__item--1-4
            grid__item--desktop-17-24
            grid__item--tablet-1-12"
            >
              <Checkout setActive={setModalActive} />
            </div>
          </div>
        </>
      )}
      <Modal active={modalActive} setActive={setModalActive}>
        We are sorry, but this feature is not implemented yet
      </Modal>
    </div>
  );
};
