import { useState } from 'react';
import styles from './ProductCard.module.scss';

export const ProductCard = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className={`${styles.product_card_container}`}>
        <div className={`${styles.img_wrapper}`}>
          <img
            src="../../img/products/phones/white-phone.png"
            alt="phone image"
            className={`${styles.image}`}
          />
        </div>
        <div className={`${styles.title_wrapper}`}>
          <h3 className={`${styles.title}`}>
            Apple iPhone 14 Pro 128GB Silver (MQ023)
          </h3>
        </div>
        <div className={`${styles.price_wrapper}`}>
          <h2 className={`${styles.price}`}>$999</h2>
        </div>

        <div className={`${styles.line}`} />

        <div className={`${styles.phone_charact_container}`}>
          <div className={`${styles.phone_charact}`}>
            <p className={`${styles.phone_charact_parag}`}>Screen</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              6.1” OLED
            </p>
          </div>
          <div className={`${styles.phone_charact}`}>
            <p className={`${styles.phone_charact_parag}`}>Capacity</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              128 GB
            </p>
          </div>
          <div className={`${styles.phone_charact}`}>
            <p className={`${styles.phone_charact_parag}`}>RAM</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              6 GB
            </p>
          </div>
        </div>

        <div className={`${styles.buttons_container}`}>
          <button className={`${styles.button} ${styles.button_add}`}>
            Add to cart
          </button>
          <button
            className={`${styles.button} ${styles.button_like}`}
            onClick={() => (clicked ? setClicked(false) : setClicked(true))}
          >
            <img
              src={
                clicked
                  ? '../../img/icons/card-selected-like.svg'
                  : '../../img/icons/card-default-like.svg'
              }
              alt="like button"
            />
          </button>
        </div>
      </div>
    </>
  );
};
