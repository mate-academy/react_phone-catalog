import { useContext, useState } from 'react';
import { DispatchContext, Do, StateContext } from '../../../context/context';
import { Link } from 'react-router-dom';
import styles from './Cart.module.scss';
import CartItem from './CartItem';
import { ArrowIconLeft } from '../../shared/icons/ArrowIcon/ArrowIcon';
import Modal from './Modal/Modal';

export const Cart = () => {
  const { cart } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const total = cart.reduce((sum, item) => item.price * item.quantity + sum, 0);
  const numberOfProducts = cart.reduce((sum, item) => item.quantity + sum, 0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function clearTheCart() {
    cart.map(item => dispatch({ type: Do.DELETE_CART, payload: item }));

    setModalIsOpen(false);
  }

  return (
    <>
      <div className={`container ${styles.cart}`}>
        <div>
          <div className={styles.return}>
            <ArrowIconLeft />
            <Link to="..">Back</Link>
          </div>
          <h1>Cart</h1>
        </div>

        {cart.length > 0 ? (
          <div className={styles.grid}>
            <div className={styles.items}>
              {cart.map(item => (
                <div key={item.itemId}>
                  <CartItem product={item} />
                </div>
              ))}
            </div>
            <div className={styles.checkout}>
              <div className={styles.checkout__total}>
                <h2>{`$${total}`}</h2>
                <p>{`Total for ${numberOfProducts} items`}</p>
              </div>
              <hr />
              <button className="button" onClick={() => setModalIsOpen(true)}>
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.wrapper}>
            <img
              className={styles.wrapper__cart}
              src="img/cart-is-empty.png"
              alt="Your cart is empty"
            />
          </div>
        )}
      </div>

      {modalIsOpen && (
        <div className={styles.modalWindow}>
          <Modal clearTheCart={clearTheCart} closeModal={setModalIsOpen} />
        </div>
      )}
    </>
  );
};

export default Cart;
