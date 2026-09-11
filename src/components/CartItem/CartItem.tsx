import { useContext } from 'react';
import { type Product } from '../ProductCardSale';
import styles from './CartItem.module.scss';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

type CartItemType = {
  id: string;
  quantity: number;
  product: Product;
};

type Props = {
  item: CartItemType;
};

export const CartItem = ({ item }: Props) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('ShoppingCard must be used inside CartProvider');
  }

  const { cartItems, setCartItems, removeProduct } = context;

  return (
    <div className={styles.cart}>
      <div className={styles.cart__first}>
        <button
          className={styles.btn}
          onClick={() => {
            removeProduct(item.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={styles.cart__iconCross}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Link to={`/product/${item.id}`} className={styles.link}>
          <img
            src={`${item.product.images[0]}`}
            alt={item.product.name}
            className={styles.cart__img}
          />
          <p className={styles.cart__name}>{item.product.name}</p>
        </Link>
      </div>
      <div className={styles.cart__second}>
        <div className={styles.cart__quantity}>
          <button
            className={styles.cart__button}
            onClick={() => {
              setCartItems(
                cartItems.map(cartItem =>
                  cartItem.id === item.id && cartItem.quantity > 1
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem,
                ),
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={styles.cart__icon}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>

          <p className={styles.cart__amount}>{item.quantity}</p>

          <button
            className={styles.cart__button}
            onClick={() => {
              setCartItems(
                cartItems.map(cartItem =>
                  cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem,
                ),
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={styles.cart__icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <p className={styles.cart__price}>${item.product.priceDiscount}</p>
      </div>
    </div>
  );
};
