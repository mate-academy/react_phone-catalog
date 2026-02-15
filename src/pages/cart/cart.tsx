import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductContext } from '../../context/ProductContext';
import styles from './cart.module.scss';
import { BackBtn } from '../../components/backBtn';
import { Title } from '../../components/title';
import { Icon } from '../../components/icons';
import { icons } from '../../constants/icons';
import { CardPrice } from '../../components/cardPrice';

export const Cart = () => {
  const {
    cart,
    filteredCart,
    removeFromCart,
    quantities,
    getQuantity,
    getFinalPrice,
    totalItems,
    totalPrice,
    clearCart,
  } = useContext(ProductContext);

  const handleCheckout = () => {
    const message = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (message) {
      return clearCart();
    }

    return message;
  };

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <BackBtn />
      </div>
      <Title title="cart" cart />
      <div className={styles.container}>
        {cart.length < 1 ? (
          <div className={styles.cartIsEmpty}>
            <h2>Your cart is empty</h2>
            <img
              src="./img/cart-is-empty.png"
              alt="Cart is empty!"
              className={styles.cartIsEmptyImg}
            />
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartProductsBlock}>
              {filteredCart.map(item => {
                const count = quantities[item.itemId] || 1;
                const isStart = count === 1;

                return (
                  <div className={styles.cartProduct} key={item.id}>
                    <div className={styles.cartProductTop}>
                      <button
                        className={styles.removeProduct}
                        onClick={() => removeFromCart(item.itemId)}
                      >
                        <Icon icon={icons.removeProduct} />
                      </button>
                      <Link
                        to={`/${item.category}/${item.itemId}`}
                        className={styles.cartLink}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.cartImg}
                        />
                        <h3 className={styles.cartTitle}>{item.name}</h3>
                      </Link>
                    </div>
                    <div className={styles.cartProductBottom}>
                      <div className={styles.cartCounter}>
                        <button
                          className={classNames(styles['button-img'], {
                            disabled: isStart,
                          })}
                          onClick={() => getQuantity(item.itemId, 'Minus')}
                          disabled={!isStart}
                        >
                          <Icon
                            icon={isStart ? icons.Minus : icons.MinusDisabled}
                          />
                        </button>
                        <div className={styles.count}>{count}</div>
                        <button
                          className={classNames(styles['button-img'], {
                            disabled: false,
                          })}
                          onClick={() => getQuantity(item.itemId, 'Plus')}
                          disabled={false}
                        >
                          <Icon icon={icons.Plus} />
                        </button>
                      </div>
                      <CardPrice fullPrice={getFinalPrice(item, count)} cart />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.cartTotalPrice}>
              <CardPrice fullPrice={totalPrice} cart />
              <div className={styles.cartTotalItems}>
                Total for {totalItems} {totalItems < 1 ? 'item' : 'items'}
              </div>
              <div className={styles.divider}></div>
              <button
                className={styles.cartCheckoutBtn}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
