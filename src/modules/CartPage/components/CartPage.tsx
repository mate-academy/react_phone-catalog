import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './CartPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

interface CartItem {
  id: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

// TODO: replace with real cart state from context/Redux
const INITIAL_CART: CartItem[] = [
  {
    id: 1,
    image: 'img/phones/apple-iphone-14-pro/silver/00.webp',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQ023)',
    quantity: 1,
    price: 999,
  },
  {
    id: 2,
    image: 'img/phones/apple-iphone-14-pro/spaceblack/00.webp',
    name: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
    quantity: 1,
    price: 859,
  },
  {
    id: 3,
    image: 'img/phones/apple-iphone-11-pro-max/gold/00.webp',
    name: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    quantity: 1,
    price: 799,
  },
];

export const CartPage = () => {
  // TODO: move to context
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemove = (id: number) =>
    setCart(prev => prev.filter(item => item.id !== id));

  const handleQuantity = (id: number, delta: number) =>
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter(item => item.quantity > 0),
    );

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link to="/" className={styles.back}>
            <i className="fas fa-chevron-left" />
            Back
          </Link>

          <h1 className={styles.title}>Cart</h1>

          {cart.length === 0 ? (
            <div className={styles.empty}>
              <img
                src="img/cart-is-empty.png"
                alt="Cart is empty"
                className={styles.emptyImage}
              />
              <p className={styles.emptyText}>Your cart is empty</p>
            </div>
          ) : (
            <div className={styles.content}>
              <div className={styles.items}>
                {cart.map(item => (
                  <div key={item.id} className={styles.item}>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove from cart"
                    >
                      <i className="fas fa-xmark" />
                    </button>

                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />

                    <p className={styles.itemName}>{item.name}</p>

                    <div className={styles.quantityRow}>
                      <div className={styles.quantity}>
                        <button
                          type="button"
                          className={cn(styles.quantityBtn, {
                            [styles.quantityBtnDisabled]: item.quantity <= 1,
                          })}
                          onClick={() => handleQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <span className={styles.quantityCount}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className={styles.quantityBtn}
                          onClick={() => handleQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          <i className="fas fa-plus" />
                        </button>
                      </div>

                      <span className={styles.itemPrice}>
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summary}>
                <p className={styles.totalPrice}>${total}</p>
                <p className={styles.totalLabel}>
                  Total for {totalCount} {totalCount === 1 ? 'item' : 'items'}
                </p>
                <hr className={styles.summaryDivider} />
                <button type="button" className={styles.checkoutBtn}>
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
