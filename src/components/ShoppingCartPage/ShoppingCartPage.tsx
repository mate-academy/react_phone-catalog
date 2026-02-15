import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './ShoppingCartPage.module.scss';
import { useCart } from '../../context/Cart';

export const ShoppingCartPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const navigate = useNavigate();
  const { cart, totalQty, totalPrice, removeFromCart, inc, dec, clear } =
    useCart();

  const handleCheckout = () => {
    const ok = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (ok) {
      clear();
    }
  };

  return (
    <section className={styles.cart}>
      <div className="container">
        <button
          className={styles['cart__back-btn']}
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate(`/${category}`);
            }
          }}
        >
          Back
        </button>
        <h1 className={styles.cart__title}>Cart</h1>
        {totalQty === 0 ? (
          <div className={styles.cart__empty}>
            <p className={styles['cart__empty-text']}>Your cart is empty</p>
            <img
              className={styles['cart__empty-img']}
              src="./img/cart-is-empty.png"
              alt="Empty Cart"
            />
          </div>
        ) : (
          <div className={styles.cart__content}>
            <>
              <div className={styles['cart__box-items']}>
                {cart.map(({ quantity, product }) => (
                  <div className={styles.cart__item} key={product.id}>
                    <div className={styles['cart__product-info']}>
                      <button
                        className={styles['cart__cancel-btn']}
                        onClick={e => {
                          e.preventDefault();
                          removeFromCart(product.id);
                        }}
                      ></button>
                      <Link to={`/${product.category}/${product.id}`}>
                        <img
                          className={styles.cart__img}
                          src={`./${product.image}`}
                          alt="Product image"
                        />
                      </Link>
                      <Link
                        className={styles.cart__name}
                        to={`/${product.category}/${product.id}`}
                      >
                        {product.name}
                      </Link>
                    </div>
                    <div className={styles['cart__quantity-price']}>
                      <div className={styles['cart__box-btns']}>
                        <button
                          className={`${styles['cart__remove-btn']} ${quantity === 1 ? styles['cart__remove-btn--disabled'] : ''}`}
                          onClick={e => {
                            e.preventDefault();
                            dec(product.id);
                          }}
                        ></button>
                        <span className={styles.cart__number}>{quantity}</span>
                        <button
                          className={styles['cart__add-btn']}
                          onClick={e => {
                            e.preventDefault();
                            inc(product.id);
                          }}
                        ></button>
                      </div>
                      <p className={styles.cart__price}>${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cart__checkout}>
                <div className={styles['cart__checkout-price']}>
                  ${totalPrice}
                </div>
                <div className={styles['cart__checkout-text']}>
                  Total for {totalQty} items
                </div>
                <div className={styles['cart__checkout-divider']}></div>
                <button
                  className={styles['cart__checkout-btn']}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    </section>
  );
};
