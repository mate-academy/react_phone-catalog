import React from 'react';
import styles from './Models.module.scss';
import { Products } from '../../../types/Products';
import { Carousel } from './Carousel';

interface Props {
  phones: Products[];
  swiperIndex: number;
  modelsTitle: string;
}

export const Models: React.FC<Props> = ({
  phones,
  swiperIndex,
  modelsTitle,
}) => {
  return (
    <section className={`page__models ${styles.models}`}>
      <div className={styles.models__main}>
        <h2 className={styles.models__title}>{modelsTitle}</h2>
        <div className={styles.models__buttons}>
          <button
            className={`${styles.models__button} ${styles['models__button--prev']} swiper-button-prev--${swiperIndex}`}
          ></button>
          <button
            className={`${styles.models__button} ${styles['models__button--next']} swiper-button-next--${swiperIndex}`}
          ></button>
        </div>
      </div>
      <Carousel
        models={phones}
        swiperIndex={swiperIndex}
        modelsTitle={modelsTitle}
      />
    </section>
  );
};
