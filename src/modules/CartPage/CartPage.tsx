import React from 'react';
import './CartPage.module.scss';
import { Header } from 'shared/Header';
import { Footer } from 'shared/Footer';
import { useProducts } from 'src/context/ProductsContext';
import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router';
import { ProductType } from 'models/product.model';

export const CartPage: React.FC = () => {
  const { cart, toggleCart } = useProducts();
  const navigate = useNavigate();

  const removeProduct = (product: ProductType) => {
    toggleCart(product);
  };

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
        <h1 className={styles.cartpage__title}>Cart</h1>
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
                <div key={product.id} className={styles.cartpage__list_product}>
                  <img
                    src="/public/img/icons/icon-close.png"
                    alt="image"
                    className={styles.cartpage__closebut}
                    onClick={() => removeProduct(product)}
                  />
                  <img
                    src={product.image}
                    alt="image"
                    className={styles.cartpage__list_product_img}
                  />
                  <h1 className={styles.cartpage__list_product_name}>
                    {product.name}
                  </h1>
                  <h2 className={styles.cartpage__list_product_price}>
                    ${product.price}
                  </h2>
                </div>
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
