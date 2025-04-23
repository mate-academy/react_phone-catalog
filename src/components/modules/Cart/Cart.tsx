import './Cart.style.scss';

import { useContext, useState } from 'react';

import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';

import { Product } from '../../../types/Product';

import { CartItem } from './CartItem/CartItem';
import { BackButton } from '../../shared/BackButton/BackButton';
import { Modal } from '../../shared/ModalWindow/ModalWindow';

import {
  calculateTotalPrice,
  calculateTotalQuantity,
} from '../../../utils/helpers';

export const Cart = () => {
  const { cartItems } = useContext(LocalStorageContext);
  const [showModal, setShowModal] = useState(false);

  const totalPrice = calculateTotalPrice(cartItems);
  const cartItemsQuantity = calculateTotalQuantity(cartItems);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="cart">
      <div className="cart__navigate-back">
        <BackButton />
      </div>

      <h1 className="cart__title">Cart</h1>

      <div className="cart__content">
        {cartItems.length > 0 ? (
          <>
            <div className="cart__items">
              {cartItems.map((item: Product) => {
                return <CartItem key={item.id} item={item} />;
              })}
            </div>

            <div className="cart__checkout">
              <div className="cart__checkout__total">
                <p className="cart__checkout__price">{`$${totalPrice}`}</p>
                <p className="cart__checkout__items-quantity">{`Total for ${cartItemsQuantity} items`}</p>
              </div>

              <button className="cart__checkout__button" onClick={handleModal}>
                <p className="cart__checkout__button__navigation">Checkout</p>
              </button>
            </div>

            {showModal && <Modal cancel={handleModal} />}
          </>
        ) : (
          <p>No items in your cart yet</p>
        )}
      </div>
    </div>
  );
};
