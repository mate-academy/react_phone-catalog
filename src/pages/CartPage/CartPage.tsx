import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';
import { TotalPrice } from '../../components/TotalPrice/TotalPrice';

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increase,
    decrease,
    clearCart,
    totalQuantity,
  } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setIsLoading(false));
  }, []);

  const totalPriceOfCart = useMemo(() => {
    return cartItems.reduce((sum, cartItem) => {
      const product = products.find(p => p.itemId === cartItem.productId);

      if (!product) {
        return sum;
      }

      return sum + product.price * cartItem.quantity;
    }, 0);
  }, [cartItems, products]);

  return (
    <main className={`${styles.main} ${styles.container}`}>
      {isLoading && <Loader />}
      {error && <p className={styles.main__errorTitle}>{error}</p>}

      {!isLoading &&
        !error &&
        (cartItems.length === 0 ? (
          <p className={styles.main__errorTitle}>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.main__backButton}>
              <BackButton />
            </div>

            <h1 className={styles.main__title}>Cart</h1>

            <div className={styles.main__content}>
              <div className={styles.main__itemsGrid}>
                {cartItems.map(item => {
                  const product = products.find(
                    p => p.itemId === item.productId,
                  );

                  if (!product) {
                    return null;
                  }

                  const itemTotalPrice = product.price * item.quantity;

                  return (
                    <div className={styles.main__cartItem} key={item.productId}>
                      <CartItem
                        item={item}
                        removeFromCart={removeFromCart}
                        increase={increase}
                        decrease={decrease}
                        totalPrice={itemTotalPrice}
                        product={product}
                      />
                    </div>
                  );
                })}
              </div>

              <div className={styles.main__totalPrice}>
                <TotalPrice
                  clearCart={clearCart}
                  totalQuantity={totalQuantity}
                  totalPriceOfCart={totalPriceOfCart}
                />
              </div>
            </div>
          </>
        ))}
    </main>
  );
};
