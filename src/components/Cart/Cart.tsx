import React, { useContext } from 'react';
import { ProductsContext } from '../../store/ProductsContext';
import { CartProduct } from '../../types/CartProduct';
import styles from './Cart.module.scss';
import icons from '../../assets/icons/icons.svg';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, SetUpdateQuantity, SetRemoveFromCart } =
    useContext(ProductsContext);
  const navigate = useNavigate();

  const handleRemove = (id: string) => {
    SetRemoveFromCart(id);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    SetUpdateQuantity(id, newQuantity);
  };

  const increaseQuantity = (id: string, quantity: number) => {
    handleQuantityChange(id, quantity + 1);
  };

  const decreaseQuantity = (id: string, quantity: number) => {
    if (quantity > 1) {
      handleQuantityChange(id, quantity - 1);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.priceRegular,
    0,
  );

  return (
    <div className={styles.cart}>
      <div className={styles.intro}>
        <button className={styles.navigationHome} onClick={() => navigate('/')}>
          <span className={styles.arrowLeft}>
            <svg>
              <use href={`${icons}#arrow-left-icon`}></use>
            </svg>
          </span>
          Back
        </button>
        <h2 className={styles.cartTitle}>Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <img src="../../../img/cart-is-empty.png" alt="Empty" />
        </div>
      ) : (
        <div className={styles.cartContent}>
          <ul className={styles.cartList}>
            {cart.map((product: CartProduct) => (
              <li className={styles.cartItem} key={product.id}>
                <div className={styles.cartItemDetails}>
                  <button
                    className={styles.cartItemRemove}
                    onClick={() => handleRemove(product.id)}
                  >
                    <svg>
                      <use href={`${icons}#icon-close-menu`}></use>
                    </svg>
                  </button>
                  <div className={styles.imageWrapper}>
                    <img src={product.image} alt={product.name} width="100" />
                  </div>
                  <h3 className={styles.cartItemName}>{product.name}</h3>
                  <div className={styles.cartItemControls}>
                    <button
                      className={styles.cartItemControlButton}
                      onClick={() =>
                        decreaseQuantity(product.id, product.quantity)
                      }
                    >
                      -
                    </button>
                    <p className={styles.cartItemQuantity}>
                      {product.quantity}
                    </p>
                    <button
                      className={styles.cartItemControlButton}
                      onClick={() =>
                        increaseQuantity(product.id, product.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.cartItemPrice}>
                    ${product.price * product.quantity}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.checkout}>
            <h3> ${totalPrice}</h3>
            <p className={styles.totalFor}>Total for {cart.length} items</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
