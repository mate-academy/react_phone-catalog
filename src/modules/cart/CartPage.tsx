import { useLocation } from 'react-router-dom';
import { BackButton } from '../../shared/ui/buttons/back';
import styles from './CartPage.module.scss';
import { useContext, useState } from 'react';
import {
  CartDispatchContext,
  CartStateContext,
} from '../../shared/context/CartContext';
import { CartItem } from './components/cartItem';
import { ModalDialog } from './components/modalDialog';

export const CartPage = () => {
  const { pathname } = useLocation();
  const { cartItems } = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems
    .map(cartItem => cartItem.quantity * cartItem.product.price)
    .reduce((sum, price) => sum + price, 0);

  const totalItemsQuantity = cartItems
    .map(cartItem => cartItem.quantity)
    .reduce((sum, quantity) => sum + quantity, 0);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    cartDispatch({ type: 'clear_cart' });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <BackButton pathname={pathname} />
      <h2 className={styles.title}>Cart</h2>
      <div className={styles.innerContainer}>
        {cartItems.length === 0 && (
          <p className="button-text ">Your cart is empty</p>
        )}

        {cartItems.length > 0 && (
          <>
            <div className={styles.cartItemsBlock}>
              {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
            <div className={styles.totalPriceBlock}>
              <h2>{`$${totalPrice}`}</h2>
              <p className={`body-text ${styles.totalItems}`}>
                Total for {totalItemsQuantity} items
              </p>
              <div className={styles.strike}></div>
              <button
                className={`button-text ${styles.checkoutButton}`}
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>

              <ModalDialog
                isOpen={isModalOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
