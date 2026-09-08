import { Outlet, useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import cartEmptyImage from '../../../api/img/cart-is-empty.png';
import { Product } from '../../../types/Product';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../app/store/GlobalContext';
import { CartProduct } from '../CartProduct/CartProduct';
import { CartModal } from '../CartModal/CartModal';

export const Cart: React.FC = () => {
  const { cart, totalCartPrice, totalCartItems, selectedProduct } =
    useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {!selectedProduct ? (
        <section
          className={styles.cart}
          style={showModal ? { opacity: '0.3' } : { opacity: '1' }}
        >
          <div onClick={() => navigate(-1)} className={styles.cart__backButton}>
            <div className={styles.cart__backButton_arrow}></div>
            <p className={styles.cart__backButton_text}>Back</p>
          </div>
          <h1 className={styles.cart__title}>Cart</h1>
          {cart.length === 0 ? (
            <div className={styles.cart__imageContainer}>
              <img
                src={cartEmptyImage}
                alt="cart-empty"
                className={styles.cart__image}
              />
            </div>
          ) : (
            <div className={styles.cart__products}>
              <ul className={styles.cart__list}>
                {cart.map((product: Product) => (
                  <CartProduct product={product} key={product.itemId} />
                ))}
              </ul>
              <div className={styles.cart__totalPrice}>
                <div className={styles.cart__totalPrice_content}>
                  <h3 className={styles.cart__totalPrice_value}>
                    {`$${totalCartPrice}`}
                  </h3>
                  <p className={styles.cart__totalPrice_amountItems}>
                    {`Total for ${totalCartItems} items`}
                  </p>
                </div>
                <div className={styles.cart__totalPrice_line}></div>
                <button
                  className={styles.cart__totalPrice_button}
                  onClick={() => setShowModal(true)}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      ) : (
        <Outlet />
      )}
      {showModal && <CartModal onClick={setShowModal} />}
    </div>
  );
};
