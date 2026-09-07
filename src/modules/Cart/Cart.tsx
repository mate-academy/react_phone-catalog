import React, { useEffect, useMemo, useState } from 'react';
import styles from './Cart.module.scss';
import { NavigationItem } from '../../shared/layout/NavigationItem';
import { useProductsState } from '../../shared/context/ProductsStateContext';
import { useProducts } from '../../shared/context/ProductsContext';
import { CartItem } from './components';
import { Loader } from '../../shared/layout/Loader';

export const Cart: React.FC = () => {
  const { products, loading } = useProducts();
  const { cart, toggleCartItem, updateCartQuantity, clearCart } =
    useProductsState();
  const [totalPrice, setTotalPrice] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter(item =>
      Object.keys(cart).map(Number).includes(item.id),
    );
  }, [products, cart]);

  useEffect(() => {
    setTotalPrice(
      filteredProducts.reduce(
        (acc, product) =>
          acc + (product.price || product.fullPrice) * cart[product.id],
        0,
      ),
    );
  }, [filteredProducts, cart]);

  const handleClick = () => {
    const isDeleteItems = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isDeleteItems) {
      clearCart();
    }
  };

  const totalCount = filteredProducts.reduce(
    (acc, product) => acc + cart[product.id],
    0,
  );

  return (
    <div className={styles.cart}>
      <div className={`${styles.cart__container} container`}>
        {loading && <Loader />}

        {!loading && filteredProducts && filteredProducts.length === 0 && (
          <div className="title">Your cart is empty</div>
        )}

        {!loading && filteredProducts && filteredProducts.length > 0 && (
          <>
            <NavigationItem />

            <div className={styles.cart__title}>Cart</div>

            <div className={styles.cart__wrapper}>
              <div className={styles.cart__list}>
                {filteredProducts &&
                  filteredProducts.map(item => (
                    <CartItem
                      key={item.id}
                      product={item}
                      toggleCartItem={toggleCartItem}
                      setTotalPrice={setTotalPrice}
                      updateCartQuantity={updateCartQuantity}
                      quantity={cart[item.id]}
                    />
                  ))}
              </div>

              <div className={`${styles.cart__checkout} ${styles.checkout}`}>
                <div className={styles.checkout__container}>
                  <div className={styles.checkout__total}>${totalPrice}</div>
                  <div className={styles.checkout__subtitle}>
                    Total for {totalCount} items{' '}
                  </div>
                  <button
                    className={styles.checkout__button}
                    onClick={handleClick}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
