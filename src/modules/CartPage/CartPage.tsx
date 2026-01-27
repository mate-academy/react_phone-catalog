import React from 'react';
import './CartPage.module.scss';
import { Header } from 'shared/Header';
import { Footer } from 'shared/Footer';
import { useProducts } from 'src/context/ProductsContext';
import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router';
import { ProductType } from 'models/product.model';

export const CartPage: React.FC = () => {
  const { cart, toggleCart, decreaseQuantity, increaseQuantity, clearCart } =
    useProducts();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const removeProduct = (product: ProductType) => {
    toggleCart(product);
  };

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
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
            src="/react_phone-catalog/img/icons/icon-chevron-arrow-left.png"
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
              src="/react_phone-catalog/img/cart-is-empty.png"
              alt="image"
              className={styles.cartpage__noproducts_img}
            />
          </div>
        ) : (
          <>
            <div className={styles.cartpage__list}>
              {cart.map(product => (
                <div
                  key={product.product.id}
                  className={styles.cartpage__list_product}
                >
                  <div className={styles.cartpage__section}>
                    <img
                      src="/react_phone-catalog/img/icons/icon-close.png"
                      alt="image"
                      className={styles.cartpage__closebut}
                      onClick={() => removeProduct(product.product)}
                    />
                    <img
                      src={'/react_phone-catalog/' + product.product.image}
                      alt="image"
                      className={styles.cartpage__list_product_img}
                    />
                    <h1 className={styles.cartpage__list_product_name}>
                      {product.product.name}
                    </h1>
                  </div>
                  <div className={styles.cartpage__section_2}>
                    <div className={styles.cartpage__changequantity}>
                      <button
                        className={styles.cartpage__changequantity_but}
                        disabled={product.quantity === 1}
                        onClick={() =>
                          decreaseQuantity(
                            product.product.itemId || product.product.id,
                          )
                        }
                      >
                        <img
                          src="/react_phone-catalog/img/icons/icon-minus.png"
                          alt="image minus"
                          className={styles.cartpage__changequantity_but_img}
                        />
                      </button>
                      <span className={styles.cartpage__changequantity_value}>
                        {product.quantity}
                      </span>
                      <button
                        className={styles.cartpage__changequantity_but}
                        onClick={() =>
                          increaseQuantity(
                            product.product.itemId || product.product.id,
                          )
                        }
                      >
                        <img
                          src="/react_phone-catalog/img/icons/icon-plus.png"
                          alt="image plus"
                          className={styles.cartpage__changequantity_but_img}
                        />
                      </button>
                    </div>
                    <h2 className={styles.cartpage__list_product_price}>
                      ${product.product.price * product.quantity}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cartpage__summary}>
              <h1 className={styles.cartpage__summary_total_amount}>
                ${totalPrice}
              </h1>
              <p className={styles.cartpage__summary_total_p}>
                Total for {totalQuantity} items
              </p>
              <button
                className={styles.cartpage__summary_but}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
