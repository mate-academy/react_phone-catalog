import React, { useRef } from 'react';
import styles from './ProductSlider.module.scss';
import sliderButton from './icons/sliderButton.png';
import { ProductCard } from '../ProductCard/ProductCard';
import { Phones } from '../../services/Phone';
// import 'swiper/css';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper';
import Loader from '../loader/spiner';
import { useAppSelector } from '../../Hooks/hooks';
import { ProductType } from '../../services/enums';

type Props = {
  title: string;
  phones: Phones[];
};

export const ProductSlider: React.FC<Props> = ({ title, phones }) => {
  const load = useAppSelector(state => state.phones.isLoading);
  const swiperRef = useRef<Swiper | null>(null);

  const type =
    ProductType.accessories && ProductType.phones && ProductType.tablets;

  return (
    <>
      <div className={styles.sliderWraper}>
        <section className={styles.sectionGoods}>
          <div className={styles.tittleAndButtons}>
            <h2 className={styles.goodsTitle}>{title}</h2>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.buttonLeft}
                aria-label="Previous"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <img
                  className={styles.buttonArrowLeft}
                  src={sliderButton}
                  alt="Previous"
                ></img>
              </button>
              <button
                className={styles.buttonRight}
                aria-label="Next"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <img
                  className={styles.buttonArrowRight}
                  src={sliderButton}
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
              spaceBetween={10}
              slidesPerView={4}
              speed={900}
              mousewheel={true}
              // loop={true}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
            >
              {phones &&
                phones.map(item => (
                  <SwiperSlide
                    key={item.id}
                    style={{ marginRight: '16px' }}
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
