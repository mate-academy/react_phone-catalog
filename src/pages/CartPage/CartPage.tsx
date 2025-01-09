import { useSelector } from 'react-redux';
import { BackButton } from '../../components/BackButton';
import { ResponsiveHeader } from '../../components/ResponsiveHeader';
import { RootState } from '../../app/store';
import { CartItem } from './CartItem';
import themeStyles from '../../styles/utils/themeStyles';
import { Modal } from '../../components/Modal';
import { useState } from 'react';

import './CartPage.scss';

export const CartPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cartItems.items);

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { cartIsEmpty } = themeStyles(currentTheme === 'light-theme');

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart-page page">
      <BackButton />

      <div className="cart-page__title">
        <ResponsiveHeader>Cart</ResponsiveHeader>
      </div>

      {!cartItems.length && (
        <div className="cart-page__image">
          <div className="cart-page__image-container">
            <img className="image" src={cartIsEmpty} alt="Cart Is Empty" />
          </div>
        </div>
      )}

      {!!cartItems.length && (
        <div className="cart-page__main">
          <div className="cart-page__item-container">
            {cartItems.map(item => (
              <CartItem key={item.id} itemData={item} />
            ))}
          </div>

          <div className="cart-page__total">
            <div className="cart-page__total-container">
              <div className="cart-page__total-price">
                <h2>${totalAmount}</h2>
                <span className="text-gray">Total for {totalItems} items</span>
              </div>

              <button
                className="card-button  buttons-text"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
};
