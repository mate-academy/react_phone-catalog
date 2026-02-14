/* eslint-disable */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { useCartProducts } from './CartContext';
import { Product } from '../../types/Product';
import { useTheme } from '../ThemeContext/ThemeContext';
import { CheckoutPopUp } from '../CheckoutPopUp/CheckoutPopUp';
import { useEffect, useState } from 'react';

const Cart = () => {
  const [checkoutPopUp, setCheckoutPopUp] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const {
    cartProducts,
    addQuantity,
    removeFromCart,
    subtractQuantity,
    clearCart,
  } = useCartProducts();
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const totalPrice = cartProducts.reduce(
    (curr, acc) => acc.priceDiscount * (acc.quantity ? acc.quantity : 1) + curr,
    0,
  );
  const handleBackButton = () => {
    navigate({ pathname: '..', search });
  };

  const totalQuantity = cartProducts.reduce(
    (curr, acc) => (acc.quantity || 1) + curr,
    0,
  );

  const handleDeleteButton = (product: Product) => {
    removeFromCart(product);
  };

  const handleIncrease = (product: Product) => {
    addQuantity(product);
  };

  const handleSubstract = (product: Product) => {
    subtractQuantity(product);
  };

  const handleCheckout = () => {
    setCheckoutPopUp(true);
  };

  const handleBuyButton = () => {
    setCheckoutPopUp(false);
    clearCart();
  };

  useEffect(() => {
    const body = document.body;

    if (checkoutPopUp) {
      body.style.height = '100vh';
      body.style.overflowY = 'hidden';
    } else {
      body.style.height = 'auto';
      body.style.overflowY = 'auto';
    }
  }, [checkoutPopUp]);

  if (cartProducts.length === 0) {
    return (
      <main className={`${styles.cart_empty_container}`}>
        <h1 className={`${styles.cart_empty_title}`}>Cart is empty</h1>
        <img
          src="./img/cart-is-empty.png"
          alt="empty cart icon"
          className={`${styles.cart_empty_image}`}
        />
      </main>
    );
  } else {
    return (
      <>
        <main className={`${styles.cart_main_container}`}>
          <div
            className={`${styles.cart_back_container}`}
            onClick={handleBackButton}
          >
            <img
              src={
                isLightTheme
                  ? './img/icons/main-default-arrow.svg'
                  : './img/icons/dark-theme-arrow.svg'
              }
              alt="left arrow"
              className={`${styles.cart_back_icon}`}
            />
            <p className={`${styles.cart_back_text}`}>Back</p>
          </div>
          <h1 className={`${styles.cart_header}`}>Cart</h1>
          <section className={`${styles.cart_products_and_checkout_cont}`}>
            <div className={styles.cart_products_container}>
              {cartProducts.map(item => {
                return (
                  <div
                    className={styles.cart_main_product_contian}
                    key={item.id}
                  >
                    <div className={`${styles.cart_img_and_head_cont}`}>
                      <button
                        className={`${styles.cart_delete_button}`}
                        onClick={() => handleDeleteButton(item)}
                      >
                        <img
                          src={
                            isLightTheme
                              ? './img/icons/close-icon.svg'
                              : './img/icons/close-icon-dark-theme.svg'
                          }
                          alt="close icon"
                          className={`${styles.cart_delete_icon}`}
                        />
                      </button>
                      <Link
                        to={`/${item.category}/${item.id}`}
                        className={`${styles.cart_product_image_wrapper}`}
                      >
                        <img
                          src={item.images[0]}
                          alt="phone image"
                          className={`${styles.cart_product_image}`}
                        />
                      </Link>
                      <div className={`${styles.cart_product_title_wrapper}`}>
                        <h2 className={`${styles.cart_product_title}`}>
                          {item.name}
                        </h2>
                      </div>
                    </div>
                    <div className={`${styles.cart_add_and_price_cont}`}>
                      <div className={`${styles.cart_plus_minus_cont}`}>
                        <button
                          className={`${styles.cart_button_wrapper} ${item.quantity === 1 && styles.cart_button_disabled}`}
                          disabled={item.quantity === 1}
                          onClick={() => handleSubstract(item)}
                        >
                          <img
                            src={
                              item.quantity
                                ? isLightTheme
                                  ? item.quantity > 1
                                    ? './img/icons/minus-icon.svg'
                                    : './img/icons/minus-icon-disabled.svg'
                                  : item.quantity > 1
                                    ? './img/icons/minus-dark-theme.svg'
                                    : './img/icons/minus-dark-theme-disabled.svg'
                                : './img/icons/minus-icon-disabled.svg'
                            }
                            alt="minus icon"
                            className={`${styles.cart_button}`}
                          />
                        </button>
                        <div className={`${styles.cart_product_count}`}>
                          {item.quantity}
                        </div>
                        <button
                          className={`${styles.cart_button_wrapper}`}
                          onClick={() => handleIncrease(item)}
                        >
                          <img
                            src={
                              isLightTheme
                                ? './img/icons/plus-icon.svg'
                                : './img/icons/plus-dark-theme.svg'
                            }
                            alt="plus icon"
                            className={`${styles.cart_button}`}
                          />
                        </button>
                      </div>
                      <p
                        className={`${styles.cart_product_price}`}
                      >{`$${item.priceDiscount * (item.quantity ? item.quantity : 1)}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`${styles.cart_checkout_container}`}>
              <div className={`${styles.cart_price_and_count}`}>
                <p className={`${styles.cart_price}`}>{`$${totalPrice}`}</p>
                <p className={`${styles.cart_count}`}>
                  {cartProducts.length > 1
                    ? `Total for ${totalQuantity} items`
                    : `Total for ${totalQuantity} item`}
                </p>
              </div>
              <hr className={`${styles.cart_line}`} />
              <button
                className={`${styles.cart_checkout_button}`}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </section>
        </main>
        {checkoutPopUp && (
          <CheckoutPopUp
            onClose={() => setCheckoutPopUp(false)}
            totalPrice={totalPrice}
            onBuy={handleBuyButton}
          />
        )}
      </>
    );
  }
};

export default Cart;
