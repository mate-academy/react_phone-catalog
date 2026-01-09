import React from 'react';
import './CartPage.module.scss';
import { Header } from 'shared/Header';
import { Footer } from 'shared/Footer';
import { useProducts } from 'src/context/ProductsContext';
import { ProductCard } from 'shared/ProductCard';
import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router';

export const CartPage: React.FC = () => {
  const { cart } = useProducts();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.cartpage}>
        <button
          className={styles.cartpage__backbutton}
          onClick={() => navigate(-1)}
        >
          <img
            className={styles.cartpage__backbutton__icon}
            src="/public/img/icons/icon-chevron-arrow-left.png"
            alt=""
          />
          <p className={styles.cartpage__backbutton__text}>Back</p>
        </button>
        {cart.length === 0 ? (
          <div className={styles.cartpage__noproducts}>
            <p className={styles.cartpage__noproducts_p}>
              No products in cart yet
            </p>
            <img
              src="/public/img/cart-is-empty.png"
              alt="image"
              className={styles.cartpage__noproducts_img}
            />
          </div>
        ) : (
          <>
            <div className={styles.cartpage__list}>
              {cart.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className={styles.cartpage__summary}>
              <h1 className={styles.cartpage__summary_total_amount}>$ xckml</h1>
              <p className={styles.cartpage__summary_total_p}>
                Total for {cart.length} items
              </p>
              <button className={styles.cartpage__summary_but}>Checkout</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
