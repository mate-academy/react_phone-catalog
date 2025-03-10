import React from 'react';
import style from './ProductCart.module.scss';
import { Favorite } from '../../shared/Favorite/Favorite';
import { Phone } from '../../type/phone';

type Props = {
  phone: Phone,
}

export const ProductCart: React.FC<Props> = ({ phone }) => {
  return (
    <>
        <div className={style.card}>
          <img src={phone.images[0]} alt="phone img" className={style.phoneImg} />

          <h2 className={style.phoneTitle}>{phone.name}</h2>

          <p className={style.phonePrice}>{`$${phone.priceRegular}`}</p>

          <div className={style.phoneDescription}>
            <div className={style.phoneProperties}>
              <p className={style.propertieTitle}>Screen</p>
              <p className={style.propertieDescription}>{phone.screen}</p>
            </div>

            <div className={style.phoneProperties}>
              <p className={style.propertieTitle}>Capacity</p>
              <p className={style.propertieDescription}>{phone.capacity}</p>
            </div>

            <div className={style.phoneProperties}>
              <p className={style.propertieTitle}>RAM</p>
              <p className={style.propertieDescription}>{phone.ram}</p>
            </div>
          </div>

          <div className={style.phoneFooter}>
            <a href="#" className={style.addToCart}>
              Add to cart
            </a>
            <div className={style.favorite}>
              <Favorite />
            </div>
          </div>
        </div>
    </>
  );
};
