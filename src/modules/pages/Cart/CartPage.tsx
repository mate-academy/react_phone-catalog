import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@components/BackButton';
import { CartItem } from '@components/CartItem';
import { Loader } from '@components/Loader';
import { Product } from '@models/Product';
import { ErrorMessage } from '@models/ErrorMessage';
import { useCart } from '@context/CartContext';
import { useLoading } from '@context/LoadingContext';
import { getAllProducts } from '@api/products';
import styles from './CartPage.module.scss';

type Props = {
  isLightMode: boolean;
};

export const Cart: React.FC<Props> = ({ isLightMode }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const {
    cartProducts,
    removeFromCart,
    increaseCount,
    decreaseCount,
    clearCart,
  } = useCart();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    startLoading();
    getAllProducts()
      .then(products => {
        if (!products && products.length === 0) {
          setErrorMessage(ErrorMessage.No_product_on_server);
        } else {
          setAllProducts(products);
        }
      })
      .catch(() => setErrorMessage(ErrorMessage.Other_problems))
      .finally(() => stopLoading());
  }, []);

  const allIdCartProduct = cartProducts.map(cart => cart.id);

  const allCartProducts: Product[] = allProducts.filter(product =>
    allIdCartProduct.includes(product.id.toString()),
  );

  const totalSum = allCartProducts.reduce((acc, product) => {
    const cartItem = cartProducts.find(
      cart => cart.id === product.id.toString(),
    );

    return acc + product.price * cartItem.quantity;
  }, 0);

  return (
    <div className={styles.cart}>
      {isLoading && <Loader />}
      {!isLoading && !errorMessage && (
        <>
          <BackButton product={null} navigate={navigate} />
          <h1 className={styles.cart__title}>Cart</h1>
          {allCartProducts.length === 0 ? (
            <div className={styles.cart__empty}>
              <h2 className={styles.cart__empty__title}>Your cart is empty</h2>
              <img
                className={styles.cart__empty__image}
                src="./img/cart-is-empty.png"
                alt="Cart-empty-img"
              />
            </div>
          ) : (
            <div className={styles.cart__container}>
              <div className={styles.cart__list}>
                {allCartProducts.map(product => (
                  <CartItem
                    key={product.id}
                    product={product}
                    isLightMode={isLightMode}
                    removeFromCart={removeFromCart}
                    increaseCount={increaseCount}
                    decreaseCount={decreaseCount}
                    cartItem={cartProducts.find(
                      cart => cart.id === product.id.toString(),
                    )}
                  />
                ))}
              </div>
              <div className={styles.cart__box}>
                <div className={styles.cart__info}>
                  <span className={styles['cart__cart__info--price']}>
                    ${totalSum}
                  </span>
                  <span className={styles['cart__info--total']}>
                    Total for {allCartProducts.length} items
                  </span>
                </div>
                <button
                  className={styles.cart__button}
                  onClick={() => {
                    const confirmCheckout = window.confirm(
                      'Checkout is not implemented yet.\n' +
                        'Do you want to clear the Cart?',
                    );

                    if (confirmCheckout) {
                      clearCart();
                    }
                  }}
                >
                  <span className={styles['cart__button--text']}>Checkout</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
