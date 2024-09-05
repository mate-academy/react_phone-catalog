import React, { useMemo, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import styles from './CartPage.module.scss';
import chevronIcon from '../../img/icons/ChevronIcon.svg';
import { useAppContext } from '../../context/AppContext';
import { CartItem } from './CartItem/CartItem';
import { Footer } from '../../components/Footer';
import { GoBack } from '../../components/GoBack';

export const CartPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const { handleNotReady, productsInCart, setProductsInCart, productsInCartCount, setProductsInCartCount } = useAppContext();

  useEffect(() => {
    const storedCartItems = localStorage.getItem('productsInCart');
    if (storedCartItems !== null && storedCartItems.length !== 0) {
      setProductsInCart(JSON.parse(storedCartItems));
    }

    const storedProductsInCartCount = localStorage.getItem('productsInCartCount');
    if (storedProductsInCartCount !== null && storedProductsInCartCount.length !== 0) {
      setProductsInCartCount(JSON.parse(storedProductsInCartCount));
    }

  }, []);

  const [totalCount, totalAmount]: number[] = useMemo(() => {
    let i: number;
    let totalCount = 0;
    let totalAmount = 0;

    for (i = 0; i < productsInCart.length; i++){
      totalCount = totalCount + productsInCartCount[i];
      totalAmount = totalAmount + productsInCartCount[i] * productsInCart[i].price;
    }

    return [totalCount, totalAmount]
  }, [productsInCart, productsInCartCount])

  return (
    <div>
      <Header />
      <PreviousPage category={category} />

      <div className={styles.cartPage}>
        <Breadcrumbs category={category} />

        <div className={styles.topContainer}>
          <div className={styles.topLeft}>
            <button className={styles.goBackButton}>
              <img
                src={chevronIcon}
                alt="home"
                className={styles.chevronIcon}
              />
              <div className={styles.goBackText}>
                <GoBack />
              </div>
            </button>
          </div>

          <h1 className={styles.title}>Cart</h1>
        </div>

        <div className={styles.emptyContainer}>
          <img
            src="img/cart-is-empty.png"
            className={`${styles.image} ${productsInCart.length > 0 ? styles.hidden : ""}`}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.cartItems}>
            {productsInCart.map((product, index) => (
              <CartItem product={product} key={index} />
            ))}
          </div>

          <div
            className={`${styles.bottomContainer} ${
              productsInCart.length === 0 ? styles.hidden : ""
            }`}
          >
            <div className={styles.checkout}>
              <h2 className={styles.totalPrice}>${totalAmount}</h2>
              <p className={styles.totalItems}>
                {`Total for ${totalCount} ${totalCount === 1 ? "item" : "items"}`}
              </p>

              <div className={styles.divider}></div>

              <button
                className={styles.checkoutButton}
                onClick={handleNotReady}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
