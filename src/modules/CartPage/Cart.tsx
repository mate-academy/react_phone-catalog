import React from 'react';
import { CartContext } from '../../CartContext';
import styles from './Cart.module.scss';
import { Link, useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const cartContext = React.useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    return null;
  }

  const { items, deleteItem, changeQuantity, clearCart } = cartContext;

  const totalPrice = () => {
    let total: number = 0;

    items.map(item => {
      const totalPerItem = item.quantity * item.product.price;

      total += totalPerItem;
    });

    return total;
  };

  const totalQuantity = () => {
    let quantity = 0;

    items.map(item => {
      quantity += item.quantity;
    });

    return quantity;
  };

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. ' + 'Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__container}>
        <button
          type="button"
          className={styles.back__button}
          onClick={() => navigate(-1)}
        >
          <div className={styles.back__icon} />
          <h4 className={styles.back__name}>Back</h4>
        </button>

        {items.length === 0 ? (
          <>
            <div className={styles.empty__cart}>Your cart is empty</div>
            <img
              className={styles.empty__cart_img}
              src="img/cart-is-empty.png"
              alt="cart-is-empty"
            />
          </>
        ) : (
          <>
            <h2 className={styles.cart__title}>Cart</h2>

            <div className={styles['cart__items-container']}>
              <div className={styles['cart__items-wrapper']}>
                {items.map(item => (
                  <div key={item.id} className={styles['cart__item-card']}>
                    <div className={styles.cart__item}>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className={styles['cart__close-button']}
                      />
                      <Link
                        to={`/product/${item.id}`}
                        className={styles.cart__link}
                      >
                        <img
                          className={styles.cart__img}
                          src={`${item.product.image}`}
                          alt="product-image"
                        />
                      </Link>
                      <Link
                        to={`/product/${item.id}`}
                        className={styles.cart__link}
                      >
                        <h3 className={styles['cart__product-name']}>
                          {item.product.name}
                        </h3>
                      </Link>
                    </div>
                    <div className={styles.cart__sum}>
                      <div className={styles.cart__quantity}>
                        <button
                          onClick={() => changeQuantity(item.id, 'desc')}
                          className={styles['cart__quantity-minus']}
                          disabled={item.quantity === 1}
                        ></button>
                        <div className={styles['cart__quantity-number']}>
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => changeQuantity(item.id, 'inc')}
                          className={styles['cart__quantity-plus']}
                        ></button>
                      </div>
                      <h2
                        className={styles.cart__price}
                      >{`$${item.product.price * item.quantity}`}</h2>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cart__total}>
                <div className={styles.cart__total_sum}>
                  <h2
                    className={styles.cart__total_price}
                  >{`$${totalPrice()}`}</h2>
                  <h2
                    className={styles.cart__total_title}
                  >{`Total for ${totalQuantity()} items`}</h2>
                </div>

                <div className={styles.line}></div>

                <button
                  className={styles.cart__checkout}
                  onClick={() => handleCheckout()}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
