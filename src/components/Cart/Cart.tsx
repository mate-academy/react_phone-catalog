import { Link } from 'react-router-dom';
import { CartItem } from '../CartItem';
import styles from './Cart.module.scss';
import { useContext, useState } from 'react';
import { ModalDialog } from '../ModalDialog/ModalDialog';
import { CartContext } from '../Contexts/CartContext';
import { NotFound } from '../NotFound';

export const Cart = () => {
  const { addedProducts, setAddedProducts } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [modal, setModal] = useState(false);

  const countTotalPrice = () => {
    setTotalPrice(
      addedProducts.reduce(
        (acc, currentValue) =>
          acc + currentValue.quantity * currentValue.product.price,
        0,
      ),
    );
  };

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
              <CartItem
                item={item}
                countTotalPrice={countTotalPrice}
                key={item.id}
              />
            ))}
          </div>

          <div className={styles.total}>
            <div className={styles.totalTitle}>
              <h1>${totalPrice}</h1>
              <span className="body-text-small grayText">
                Total for {addedProducts.length} item
                {addedProducts.length > 1 ? 's' : ''}
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
