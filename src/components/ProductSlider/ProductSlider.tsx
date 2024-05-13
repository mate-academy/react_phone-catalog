import React, { useRef } from 'react';
import styles from './ProductSlider.module.scss';
import sliderButton from './Pictures/sliderButton.png';
import sliderButtonDark from './Pictures/sliderButtonDark.png';
import { ProductCard } from '../ProductCard/ProductCard';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import Loader from '../Loader/Spiner';
import { useAppSelector } from '../../Hooks/hooks';
import { ProductType } from '../../services/enums';
import { Product } from '../../services/productType';
import { Theme } from '../../services/theme';

type Props = {
  title: string;
  phones: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, phones }) => {
  const load = useAppSelector(state => state.phones.isLoading);
  const theme = useAppSelector(state => state.theme.theme);
  const swiperRef = useRef<Swiper | null>(null);

  const type =
    ProductType.accessories && ProductType.phones && ProductType.tablets;

  return (
    <>
      <div className={styles.sliderWraper}>
        <section className={styles.sectionGoods}>
          <div className={styles.tittleAndButtons}>
            <h2
              className={
                theme === Theme.light
                  ? styles.goodsTitle
                  : styles.goodsTitleDark
              }
            >
              {title}
            </h2>
            <div className={styles.buttonsContainer}>
              <button
                className={
                  theme === Theme.light
                    ? styles.buttonLeft
                    : styles.buttonLeftDark
                }
                aria-label="Previous"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <img
                  className={styles.buttonArrowLeft}
                  src={theme === Theme.light ? sliderButton : sliderButtonDark}
                  alt="Previous"
                ></img>
              </button>
              <button
                className={
                  theme === Theme.light
                    ? styles.buttonRight
                    : styles.buttonRightDark
                }
                aria-label="Next"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <img
                  className={styles.buttonArrowRight}
                  src={theme === Theme.light ? sliderButton : sliderButtonDark}
                  alt="Next"
                ></img>
              </button>
            </div>
          </div>
          {load ? (
            <div className={styles.loaderContainer}>
              <Loader />
            </div>
          ) : (
            <ReactSwiper
              className={styles.productsCard}
              spaceBetween={1}
              slidesPerView={'auto'}
              speed={900}
              mousewheel={true}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
            >
              {phones &&
                phones.map(item => (
                  <SwiperSlide
                    key={item.id}
                    style={{ marginRight: '16px', width: 'auto' }}
                    className={styles.swiperSlide}
                  >
                    <ProductCard item={item} type={type} />
                  </SwiperSlide>
                ))}
            </ReactSwiper>
          )}
        </section>
      </div>
    </>
  );
};
