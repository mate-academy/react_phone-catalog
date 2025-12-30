import React, { useCallback } from "react";
import styles from './Cart.module.scss';
import { useNavigate } from "react-router-dom";
import BackArrow from '../../icons/arrows/Active_left.png'
import { useShoppingCart } from "../../context/ShoppingCartContext";
import RemoveIcon from '../../icons/remove_icon.png';
import MinusIcon from '../../icons/minus_icon.png';
import PlusIcon from '../../icons/plus_icon.png';
import products from '../../../public/api/products.json';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { increaseItemQuantity, decreaseItemQuantity, removeFromCart, cartItems } = useShoppingCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalCost = cartItems.reduce((acc, item) => {
    const product = products.find(p => p.itemId === item.id);
    return acc + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__back} onClick={() => navigate(-1)}>
        <img src={BackArrow} alt="Back" className={styles.cart__back__icon} />
        <p className={styles.cart__back__text}>Back</p>
      </div>

      <h2 className={styles.cart__title}>Cart</h2>

      <div className={styles.cart__products}>
        <div className={styles.cart__item}>
          {cartItems.map(cartItem => {
            const product = products.find(i => i.itemId === cartItem.id);
            const isOne = cartItem.quantity === 1;
            return (
              <div
                key={cartItem.id}
                className={styles.cart__item__container}
              >
                <div className={styles.cart__item__container__inner}>
                  <button
                    className={styles.cart__item__remove}
                    onClick={() => removeFromCart(cartItem.id)}
                  >
                    <img src={RemoveIcon} alt="Remove from cart" className={styles.cart__item__remove__icon} />
                  </button>

                  <img
                    className={styles.cart__item__info__image}
                    src={product?.image}
                    alt="Product image"
                  />
                  <p className={styles.cart__item__info__title}>{product?.name}</p>
                  <div className={styles.cart__item__info__buttons}>
                    <button
                      className={styles.cart__item__info__buttons__button}
                      onClick={() => decreaseItemQuantity(cartItem.id)}
                      disabled={isOne}
                    >
                      <img
                        src={MinusIcon}
                        alt="Subtract one product"
                        className={styles.cart__item__info__buttons__button__icon}
                      />
                    </button>
                    <span className={styles.cart__item__info__buttons__quantity}>{cartItem.quantity}</span>
                    <button
                      className={styles.cart__item__info__buttons__button}
                      onClick={() => increaseItemQuantity(cartItem.id)}
                    >
                      <img
                        src={PlusIcon}
                        alt="Add one product"
                        className={styles.cart__item__info__buttons__button__icon}
                      />
                    </button>
                  </div>

                  <p className={styles.cart__item__info__price}>${(product?.price || 0) * cartItem.quantity}</p>
                </div>
              </div>
            )
          })}

        </div>

        <div className={styles.cart__checkout}>
          <div className={styles.cart__checkout__container}>
            <p className={styles.cart__checkout__price}>${totalCost}</p>
            <p className={styles.cart__checkout__total}>Total for {totalItems} items</p>
            <button className={styles.cart__checkout__button}>Checkout</button>
          </div>
        </div>
      </div>


    </div>
  )
}
