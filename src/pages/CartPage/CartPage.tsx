import { useContext } from 'react';
import styles from './CartPage.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext/CartContext';
import classNames from 'classnames';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, changeQuntity, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  return (
    <div className={styles.container}>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <img
          src="/img/icons/VectorPrev.svg"
          className={styles.Prev}
          alt="PrevVector"
        />
        <button className={styles.backButton}>Back</button>
      </div>

      <div className={styles.CartContainer}>
        <div className={styles.title}>Cart</div>

        {cartItems.length > 0 ? (
          <div className={styles.gridContainer}>
            <div className={styles.productContainer}>
              {cartItems.map(product => {
                return (
                  <div className={styles.product} key={product.id}>
                    <div className={styles.topRow}>
                      <img
                        src="public\img\icons\Close-gray.svg"
                        alt="close"
                        className={styles.close}
                        onClick={() => {
                          removeFromCart(product.id);
                        }}
                      />
                      <NavLink
                        to={`/product/${product.product.itemId}`}
                        className={styles.navLink}
                      >
                        <div className={styles.picturesContainer}>
                          <img
                            src={product.product.image}
                            alt="pictures"
                            className={styles.picture}
                          />
                        </div>

                        <h2 className={styles.productTitle}>
                          {product.product.name}
                        </h2>
                      </NavLink>
                    </div>
                    <div className={styles.secondRow}>
                      <div className={styles.counter}>
                        <button
                          className={classNames(
                            styles.buttons,
                            styles.buttonMinus,
                          )}
                          onClick={() => {
                            changeQuntity(product.id, -1);
                          }}
                          disabled={product.quantity === 1}
                        >
                          -
                        </button>
                        {product.quantity}
                        <button
                          className={classNames(
                            styles.buttons,
                            styles.buttonPlus,
                          )}
                          onClick={() => {
                            changeQuntity(product.id, 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className={styles.price}>
                        ${product.product.price}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.totalContainer}>
              <div className={styles.totalPrice}>
                <div className={styles.price}>${totalPrice}</div>
                <div className={styles.priceInfo}>
                  Total for {cartItems.length} items
                </div>
              </div>

              <div className={styles.line}></div>

              <button className={styles.buttonAdd}>Checkout</button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty </p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
