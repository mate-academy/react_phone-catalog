import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Cart.module.scss';
import { useCartProducts } from './CartContext';
import { ProductCard } from '../ProductCard/ProductCard';

export const Cart = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { cartProducts } = useCartProducts();
  const totalPrice = cartProducts.reduce(
    (curr, acc) => acc.priceDiscount + curr,
    0,
  );

  const handleBackButton = () => {
    navigate({ pathname: '..', search });
  };

  return (
    <>
      <div className={`${styles.cart_main_container}`}>
        <div
          className={`${styles.cart_back_container}`}
          onClick={handleBackButton}
        >
          <img
            src="./img/icons/main-default-arrow.svg"
            alt="left arrow"
            className={`${styles.cart_back_icon}`}
          />
          <p className={`${styles.cart_back_text}`}>Back</p>
        </div>
        <h1 className={`${styles.cart_header}`}>Cart</h1>
        <div className={`${styles.cart_products_and_checkout_cont}`}>
          <div className={styles.cart_products_container}>
            {cartProducts.map(item => {
              return <ProductCard product={item} key={item.id} />;
            })}
          </div>
          <div className={`${styles.cart_checkout_container}`}>
            <div className={`${styles.cart_price_and_count}`}>
              <p className={`${styles.cart_price}`}>{`$${totalPrice}`}</p>
              <p className={`${styles.cart_count}`}>
                {cartProducts.length > 1
                  ? `Total for ${cartProducts.length} items`
                  : `Total for ${cartProducts.length} item`}
              </p>
            </div>
            <hr className={`${styles.cart_line}`} />
            <button className={`${styles.cart_checkout_button}`}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
