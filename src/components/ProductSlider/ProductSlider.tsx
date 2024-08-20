import React, { useRef } from 'react';
import styles from './ProductSlider.module.scss';
import sliderButton from './Pictures/sliderButton.png';
import sliderButtonDark from './Pictures/sliderButtonDark.png';
import { ProductCard } from '../ProductCard/ProductCard';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import Loader from '../Loader/Loader';
import { useAppSelector } from '../../Hooks/hooks';
import { ProductType } from '../../Helpers/enumProductType';
import { Product } from '../../types/productType';
import { Theme } from '../../Helpers/theme';

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

  const getSlidesPerGroup = () => {
    const width = window.innerWidth;

    if (width >= 1024) {
      return 4;
    } else if (width >= 755) {
      return 3;
    } else if (width >= 640) {
      return 2;
    } else {
      return 1;
    }
  };

  const slideNext = () => {
    if (swiperRef.current) {
      const slidesPerGroup = getSlidesPerGroup();
      const currentIndex = swiperRef.current.activeIndex;

      swiperRef.current.slideTo(currentIndex + slidesPerGroup);
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      const slidesPerGroup = getSlidesPerGroup();
      const currentIndex = swiperRef.current.activeIndex;

      swiperRef.current.slideTo(currentIndex - slidesPerGroup);
    }
  };

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
                disabled={swiperRef.current?.isBeginning || false}
                className={
                  theme === Theme.light
                    ? styles.buttonLeft
                    : styles.buttonLeftDark
                }
                aria-label="Previous"
                onClick={() => slidePrev()}
              >
                <img
                  className={styles.buttonArrowLeft}
                  src={theme === Theme.light ? sliderButton : sliderButtonDark}
                  alt="Previous"
                ></img>
              </button>
              <button
                disabled={swiperRef.current?.isEnd || false}
                className={
                  theme === Theme.light
                    ? styles.buttonRight
                    : styles.buttonRightDark
                }
                aria-label="Next"
                onClick={() => slideNext()}
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
