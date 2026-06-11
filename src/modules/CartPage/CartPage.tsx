import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './CartPage.module.scss';
import { Loader } from '../../components/Loader/Loader';
import emptyCartIcon from '../../assets/img/cart-is-empty.png';

interface Product {
  id: string;
  itemId: string;
  category: string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
}

interface CartProduct extends Product {
  quantity: number;
}

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load products. Please try again later.');
        }

        return res.json();
      })
      .then((data: Product[]) => setAllProducts(data))
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 500),
      );
  }, []);

  const cartProducts: CartProduct[] = cartItems
    .map(cartItem => {
      const productInfo = allProducts.find(
        p => String(p.id) === String(cartItem.id) || p.itemId === cartItem.id,
      );

      if (productInfo) {
        return {
          ...productInfo,
          id: cartItem.id,
          quantity: cartItem.quantity,
        };
      }

      return null;
    })
    .filter((item): item is CartProduct => item !== null);

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  if (error) {
    return (
      <div className={styles.cartPage}>
        <Link to=".." className={styles.cartPageBack}>
          Back
        </Link>
        <h2 className={styles.errorMessage}>{error}</h2>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.cartPage}>
      <Link to=".." className={styles.cartPageBack}>
        Back
      </Link>
      <h1 className={styles.cartPageTitle}>Cart</h1>

      {cartProducts.length > 0 ? (
        <div className={styles.cartPageContent}>
          <div className={styles.cartPageItemsList}>
            {cartProducts.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <button
                  type="button"
                  className={styles.cartItemBtnRemove}
                  onClick={() => removeFromCart(item.id, item.name)}
                ></button>

                <div className={styles.cartItemImageContainer}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartItemImage}
                  />
                </div>

                <Link
                  to={`/${item.category}/${item.itemId}`}
                  className={styles.cartItemName}
                >
                  {item.name}
                </Link>

                <div className={styles.cartItemQuantityControls}>
                  <button
                    type="button"
                    className={`${styles.cartItemBtnQty} ${styles.minus}`}
                    disabled={item.quantity === 1}
                    onClick={() => updateQuantity(item.id, 'minus')}
                  ></button>
                  <span className={styles.cartItemQtyValue}>
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className={`${styles.cartItemBtnQty} ${styles.plus}`}
                    onClick={() => updateQuantity(item.id, 'plus')}
                  ></button>
                </div>

                <div className={styles.cartItemPrice}>
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.cartPageCheckout} ${styles.checkoutBox}`}>
            <h2 className={styles.checkoutBoxTotalPrice}>${totalPrice}</h2>
            <p className={styles.checkoutBoxTotalCount}>
              Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
            <div className={styles.checkoutBoxDivider} />
            <button
              type="button"
              className={styles.checkoutBoxBtnSubmit}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.cartPageEmpty}>
          <h2>Your cart is empty</h2>
          <p>Add you first product to the cart</p>
          <img
            src={emptyCartIcon}
            alt="Empty cart icon"
            className={styles.cartPageEmptyImage}
          />
        </div>
      )}
    </div>
  );
};
