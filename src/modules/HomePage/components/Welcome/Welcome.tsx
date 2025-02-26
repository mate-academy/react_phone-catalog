import { Link } from 'react-router-dom';
import styles from './Welcome.module.scss';
import classNames from 'classnames';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import type SwiperCore from 'swiper';
import 'swiper/css';
import { useCallback, useRef, useState } from 'react';
import { ProductType } from '../../../../enums/ProductType';

export const Welcome = () => {
  const [currentImage, setCurrentImage] = useState<ProductType>(
    ProductType.phones,
  );
  const swiperRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper.slideNext();
  }, []);

  const handleSlideChange = (swiper: SwiperCore) => {
    const activeIndex = swiper.realIndex;

    setCurrentImage(Object.values(ProductType)[activeIndex]);
  };

  const handleSelectorButton = (product: ProductType) => {
    const targetIndex = Object.values(ProductType).indexOf(product);

    swiperRef.current?.swiper.slideTo(targetIndex);
  };

  return (
    <section className={styles.welcome}>
      <span className={styles.welcome__title}>
        Welcome to Nice Gadgets store!
      </span>

      <div className={styles.welcome__banner}>
        <div className={styles.welcome__bannerContainer}>
          <button
            className={classNames(
              styles.welcome__bannerSwipeButton,
              styles.welcome__bannerSwipeButtonLeft,
            )}
            onClick={handlePrev}
          >
            <img src="/img/buttons/swipe-button-left.svg" alt="Swipe left" />
          </button>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000 }}
            speed={600}
            onSlideChange={handleSlideChange}
            className={styles.welcome__bannerImageContainer}
            ref={swiperRef}
          >
            {Object.values(ProductType).map(product => (
              <SwiperSlide key={product}>
                <Link
                  to={`./${product}`}
                  className={classNames(styles.welcome__bannerImageLink)}
                >
                  <img
                    src={`/img/banner-${product}.png`}
                    alt={product}
                    className={styles.welcome__bannerImage}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={classNames(
              styles.welcome__bannerSwipeButton,
              styles.welcome__bannerSwipeButtonRight,
            )}
            onClick={handleNext}
          >
            <img src="/img/buttons/swipe-button-right.svg" alt="Swipe right" />
          </button>
        </div>

        <div className={styles.welcome__bannerSelector}>
          {Object.values(ProductType).map(product => (
            <button
              className={styles.welcome__bannerSelectorButton}
              key={product}
              onClick={() => handleSelectorButton(product)}
            >
              <div
                className={classNames(
                  styles.welcome__bannerSelectorButtonDash,
                  {
                    [styles['welcome__bannerSelectorButtonDash--is-active']]:
                      currentImage === product,
                  },
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
