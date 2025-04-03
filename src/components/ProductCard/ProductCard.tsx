import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
// import phones from '../../../public/json/phones.json';
import { Phone } from '../../types/Phone';

type Props = {
  phone: Phone;
}

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className={`${styles.product_card_container}`}>
        <div className={`${styles.img_and_title_wrapper}`}>
          <div className={`${styles.img_wrapper}`}>
            <img
              src={phone.images[0]}
              alt={phone.name}
              className={`${styles.image}`}
            />
          </div>
          <div className={`${styles.title_wrapper}`}>
            <h3 className={`${styles.title}`}>{phone.name}</h3>
          </div>
        </div>
        <div className={`${styles.price_wrapper}`}>
          <h2 className={`${styles.price}`}>{`$${phone.priceRegular}`}</h2>
          <h2 className={`${styles.oldPrice}`}>{`$${phone.priceDiscount}`}</h2>
        </div>

        <div className={`${styles.line}`} />

        <div className={`${styles.phone_charact_container}`}>
          <div className={`${styles.phone_charact}`}>
            <p className={`${styles.phone_charact_parag}`}>Screen</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {phone.screen}
            </p>
          </div>
          <div className={`${styles.phone_charact}`}>
            <p className={`${styles.phone_charact_parag}`}>Capacity</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {phone.capacity}
            </p>
          </div>
          <div className={`${styles.phone_charact}`}>
            <p className={`${styles.phone_charact_parag}`}>RAM</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {phone.ram}
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
