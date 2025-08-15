import React from 'react';

import '@/styles/main.scss';
import styles from './PromoCarousel.module.scss';

export const PromoCarousel: React.FC = () => {
  return (
    <div className={styles.promo_carousel}>
      <div className={styles.promo_carousel__banner}>
        <div className={styles.promo_carousel__button}>
          <button className="button__circle button__circle--arrow">
            <i className="icon icon--left"></i>
          </button>
        </div>
        <img
          src="/img/banner-phones.png"
          alt="phones"
          className={styles.promo_carousel__image}
        />
        <div className={styles.promo_carousel__button}>
          <button className="button__circle button__circle--arrow">
            <i className="icon icon--right"></i>
          </button>
        </div>
      </div>
      <div className={styles.promo_carousel__pagination}>
        <div className={styles['promo_carousel__pagination--item']}></div>
        <div className={styles['promo_carousel__pagination--item']}></div>
        <div className={styles['promo_carousel__pagination--item']}></div>
      </div>
    </div>
  );
};
