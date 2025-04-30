import { Link } from 'react-router-dom';
import { CartItem } from '../CartItem';
import styles from './Cart.module.scss';
import { useContext, useMemo, useState } from 'react';
import { ModalDialog } from '../ModalDialog/ModalDialog';
import { CartContext } from '../Contexts/CartContext';
import { NotFound } from '../NotFound';

export const Cart = () => {
  const { addedProducts, setAddedProducts } = useContext(CartContext);

  const [modal, setModal] = useState(false);

  const totalPrice = useMemo(() => {
    return addedProducts.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    );
  }, [addedProducts]);

  const itemsQuantity = useMemo(() => {
    return addedProducts.reduce((acc, item) => acc + item.quantity, 0);
  }, [addedProducts]);

  const activeModal = () => {
    setModal(!modal);
  };

  const handleClear = () => {
    setAddedProducts([]);

    activeModal();
  };

  return (
    <div className="cartPage">
      <div className={styles.cartButton}>
        <div className="backPageButtons">
          <div className="backBtn">
            <span className="icon arrow" />
          </div>

          <Link to=".." className="body-text grayText">
            Back
          </Link>
        </div>
      </div>

      <h1>Cart</h1>

      {addedProducts.length > 0 ? (
        <div className={`${styles.cartContent}`}>
          <div className={styles.cartItems}>
            {addedProducts.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>

          <div className={styles.total}>
            <div className={styles.totalTitle}>
              <h1>${totalPrice}</h1>
              <span className="body-text-small grayText">
                Total for {itemsQuantity} item
                {itemsQuantity > 1 ? 's' : ''}
              </span>
            </div>

            <hr className="horizontalLine" />

            <button
              className={`${styles.sheckoutButton} button primaryBtn`}
              onClick={activeModal}
            >
              <span className="buttonText">Checkout</span>
            </button>
          </div>
        </div>
      ) : (
        <NotFound title={'Your cart is empty'} imgSrc={'cart-is-empty.png'} />
      )}

      {modal && <ModalDialog cancel={activeModal} confirm={handleClear} />}
    </div>
  );
};
