import styles from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <main className={styles.cart}>
      <div className={styles.cart__container}>
        <div className={styles.cart__wrapper}>
          <div className={styles.cart__backButtonWrapper}>
            <img
              src="src/assets/icons/cart-icons/cart-arrow-icon.svg"
              alt="Back to previous page"
              className={styles.cart__backArrowImg}
            />
            <a href="#" className={styles.cart__backButton}>
              Back
            </a>
          </div>
          <h1 className={styles.cart__title}>Cart</h1>
        </div>

        <section className={styles.cart__items}>
          <div className={styles.cart__itemsWrapper}>
            <div className={styles.cart__item}>
              <div className={styles.cart__description}>
                <button className={styles.cart__itemDeleteBtn}>
                  <img
                    className={styles.cart__itemDeleteImg}
                    src="src/assets/icons/cart-icons/cart-delete-icons.svg"
                    alt="Видалити товар з корзини"
                  />
                </button>
                <img
                  className={styles.cart__itemImage}
                  src="src/assets/images/cartPage/cart-phone-image.png"
                  alt="Фото товару"
                />
                <p className={styles.cart__itemDescription}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
              </div>
              <div className={styles.cart__toPay}>
                <div className={styles.cart__itemControl}>
                  <button className={styles.cart__minusBtn}>
                    <img
                      className={styles.cart__minusBtnImg}
                      src="src/assets/icons/cart-icons/cart-minus-icon.svg"
                      alt=""
                    />
                  </button>
                  <p className={styles.cart__addedItems}>1</p>
                  <button className={styles.cart__plusBtn}>
                    <img
                      className={styles.cart__plusBtnImg}
                      src="src/assets/icons/cart-icons/cart-plus-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
                <h3 className={styles.cart__price}>$999</h3>
              </div>
            </div>
            <div className={styles.cart__item}>
              <div className={styles.cart__description}>
                <button className={styles.cart__itemDeleteBtn}>
                  <img
                    className={styles.cart__itemDeleteImg}
                    src="src/assets/icons/cart-icons/cart-delete-icons.svg"
                    alt="Видалити товар з корзини"
                  />
                </button>
                <img
                  className={styles.cart__itemImage}
                  src="src/assets/images/cartPage/cart-phone-image.png"
                  alt="Фото товару"
                />
                <p className={styles.cart__itemDescription}>
                  Apple iPhone 14 Pro 128GB Silver (MQ023)
                </p>
              </div>
              <div className={styles.cart__toPay}>
                <div className={styles.cart__itemControl}>
                  <button className={styles.cart__minusBtn}>
                    <img
                      className={styles.cart__minusBtnImg}
                      src="src/assets/icons/cart-icons/cart-minus-icon.svg"
                      alt=""
                    />
                  </button>
                  <p className={styles.cart__addedItems}>1</p>
                  <button className={styles.cart__plusBtn}>
                    <img
                      className={styles.cart__plusBtnImg}
                      src="src/assets/icons/cart-icons/cart-plus-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
                <h3 className={styles.cart__price}>$999</h3>
              </div>
            </div>
          </div>

          <div className={styles.cart__totalPrice}>
            <ul className={styles.cart__listItems}>
              <li className={styles.cart__listItemPrice}>$2657</li>
              <li className={styles.cart__listItemInfo}>Total for 3 items</li>
            </ul>
            <span className={styles.cart__line}></span>
            <button className={styles.cart__checkout}>Checkout</button>
          </div>
        </section>
      </div>
    </main>
  );
};
