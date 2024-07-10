import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './ProductLine.module.scss';
import Card from '../Card';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { CardType } from '../../../types/Card';
import React from 'react';

export type ValueArrow = 'minus' | 'plus';

export interface ProductLineType {
  title: string;
  cards: CardType[];
  isHot?: boolean;
  isResetTitleWidth?: boolean;
}

export const ProductLine: React.FC<ProductLineType> = ({
  title,
  cards,
  isHot,
  isResetTitleWidth,
}) => {
  const [slide, setSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass>();

  const phonePerPage = 1.4;
  const tabletPerPage = 2.6;
  const pcPerPage = 4;

  const [perPage, setPerPage] = useState(phonePerPage);

  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setPerPage(pcPerPage);

      return;
    }

    if (window.innerWidth >= 640) {
      setPerPage(tabletPerPage);

      return;
    }

    if (window.innerWidth >= 320) {
      setPerPage(phonePerPage);

      return;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const count = cards.length;
  const lastSlide = Math.ceil(count - perPage);

  const setNewSlide = (val: ValueArrow) => {
    switch (val) {
      case 'minus': {
        if (slide > 0) {
          setSlide(slide - 1);

          if (swiper) {
            swiper.slidePrev();
          }
        }

        break;
      }

      case 'plus': {
        if (slide < lastSlide) {
          setSlide(slide + 1);

          if (swiper) {
            swiper.slideNext();
          }
        }

        break;
      }
    }
  };

  return (
    <div className={styles.line}>
      <div className={styles['line__new-header']}>
        <h2
          className={classNames(styles['line__new-header-title'], {
            [styles['line__new-header-title--reset']]: isResetTitleWidth,
          })}
        >
          {title}
        </h2>

        <div className={styles['line__new-header-buttons']}>
          <a
            className={classNames(
              styles['line__new-header-btn'],
              styles['line__new-header-btn--left'],
              { [styles['line__new-header-btn--disabled']]: slide === 0 },
            )}
            onClick={() => setNewSlide('minus')}
          ></a>
          <a
            className={classNames(
              styles['line__new-header-btn'],
              styles['line__new-header-btn--right'],
              {
                [styles['line__new-header-btn--disabled']]: slide === lastSlide,
              },
            )}
            onClick={() => setNewSlide('plus')}
          ></a>
        </div>
      </div>

      <div className={styles.line__swiper}>
        <Swiper
          spaceBetween={10}
          onSlideChange={sw => setSlide(sw.activeIndex)}
          onSwiper={sw => setSwiper(sw)}
          breakpoints={{
            320: {
              slidesPerView: phonePerPage,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: tabletPerPage,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: pcPerPage,
              spaceBetween: 20,
            },
          }}
        >
          {cards.map(cardInfo => {
            return (
              <SwiperSlide key={cardInfo.itemId}>
                <Card {...cardInfo} isHot={isHot} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
