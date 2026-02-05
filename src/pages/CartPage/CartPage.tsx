import React, { useState } from 'react';
import style from './CartPage.module.scss';
import { useCard } from '../../context/CardContext';

export const CartPage: React.FC = () => {
  const {
    item,
    remove,
    increment,
    decrement,
    clear,
    totalQuality,
    totalAmount,
  } = useCard();

  const [showModal, setShowModal] = useState(false);

  const checkout = () => {
    setShowModal(true);
  };

  const checkoutClean = () => {
    clear();
    setShowModal(false);
  };

  if (item.length === 0) {
    return (
      <div className={style.emptyCart}>
        <img
          src="./img/cart-is-empty.png"
          alt="empty cart"
          className={style.imgAside}
        />
        <h2 className={style.cart}>Your cart is empty</h2>
        <p className={style.cart}>Add something to make it happy</p>
      </div>
    );
  }

  return (
    <div className={style.section}>
      {showModal && (
        <div className={style.modalWindow}>
          <div className={style.modalSection}>
            <p className={style.titleModal}>Checkout is not implemented yet.</p>
            <p className={style.textModal}>Do you want to clear the Cart?</p>

            <div className={style.buttonCheckout}>
              <button className={style.butYes} onClick={checkoutClean}>
                Yes, clear
              </button>
              <button
                className={style.butCancel}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={style.topNavDetails}>
        <img src="./img/arrows/arrow_left.svg" alt="button left" />
        <p className={style.nameNav}>Back</p>
      </div>

      <h2 className={style.forH}>Cart</h2>

      <div className={style.cartPart}>
        <ul className={style.styleItem}>
          {item.map(i => (
            <li key={i.id} className={style.liItem}>
              <div className={style.itemBlock}>
                <div className={style.blockPartOne}>
                  <button onClick={() => remove(i.id)} className={style.button}>
                    <img
                      src="./img/buttons/close_menu_silver.svg"
                      alt="close menu"
                    />
                  </button>
                  <img
                    src={i.product.images?.[0] || i.product.image}
                    alt="product image"
                    className={style.productImages}
                  />
                  <p className={style.paragraph}>{i.product.name}</p>
                </div>
                <div className={style.blockPartTwo}>
                  <div className={style.butPart}>
                    <button
                      onClick={() => decrement(i.id)}
                      className={`${style.buttons} ${style.buttonPlus}`}
                    >
                      -
                    </button>
                    <span className={style.quality}>{i.quality}</span>
                    <button
                      onClick={() => increment(i.id)}
                      className={`${style.buttons} ${style.buttonMinus}`}
                    >
                      +
                    </button>
                  </div>

                  <p className={style.priceOneProduct}>
                    ${i.product.priceRegular || i.product.price}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className={style.bottom}>
          <div className={style.firstPartBottom}>
            <p className={style.totalParagraph}>${totalAmount}</p>
            <span className={style.spanText}>
              Total for {totalQuality} items
            </span>
          </div>
          <div className={style.buttonCheckout}>
            <button onClick={checkout} className={style.secondPartBottom}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
