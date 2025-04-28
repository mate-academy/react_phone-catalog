import styles from './CartProduct.module.scss';

export const CartProduct = () => {
  return (
    <div className={styles.cart__item} key={cartProduct.id}>
      <div className={styles.cart__description}>
        <button
          className={styles.cart__itemDeleteBtn}
          onClick={() => handleDeleteProduct(cartProduct.product.id)}
        >
          <img
            className={styles.cart__itemDeleteImg}
            src="src/assets/icons/cart-icons/cart-delete-icons.svg"
            alt="Видалити товар з корзини"
          />
        </button>
        <img
          className={styles.cart__itemImage}
          src={cartProduct.product.image}
          alt="Фото товару"
        />

        <p className={styles.cart__itemDescription}>
          {cartProduct.product.name}
        </p>
      </div>
      <div className={styles.cart__toPay}>
        <div className={styles.cart__itemControl}>
          <button
            className={styles.cart__minusBtn}
            onClick={() =>
              handleChangeQuantity(
                cartProduct.product.id,
                cartProduct.quantity - 1,
              )
            }
            disabled={cartProduct.quantity === 1}
          >
            <img
              className={styles.cart__minusBtnImg}
              src={`src/assets/icons/cart-icons/${cartProduct.quantity === 1 ? 'cart-minus-icon.svg' : 'cart-minus-icon-active.svg'}`}
              alt=""
            />
          </button>
          <p className={styles.cart__addedItems}>{cartProduct.quantity}</p>
          <button
            className={styles.cart__plusBtn}
            onClick={() =>
              handleChangeQuantity(
                cartProduct.product.id,
                cartProduct.quantity + 1,
              )
            }
          >
            <img
              className={styles.cart__plusBtnImg}
              src="src/assets/icons/cart-icons/cart-plus-icon.svg"
              alt=""
            />
          </button>
        </div>
        <h3 className={styles.cart__price}>
          {`$${cartProduct.quantity * cartProduct.product.price}`}
        </h3>
      </div>
    </div>
  );
};
