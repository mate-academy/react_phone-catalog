import { FC, useEffect, useState } from 'react';
import { BASE_URL } from '../../../../utils/constants';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/scss';
import classNames from 'classnames';
import styles from './Gallery.module.scss';

type ThumbsDirectionType = 'vertical' | 'horizontal';

type Props = {
  images: string[];
};

export const Gallery: FC<Props> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [thumbsDirection, setThumbsDirection] = useState<ThumbsDirectionType>(
    () => {
      if (window.innerWidth > 639) {
        return 'vertical';
      } else {
        return 'horizontal';
      }
    },
  );

  useEffect(() => {
    const getWidth = () => {
      if (window.innerWidth > 639) {
        setThumbsDirection('vertical');
      } else {
        setThumbsDirection('horizontal');
      }
    };

    window.addEventListener('resize', getWidth);

    return () => window.removeEventListener('resize', getWidth);
  }, []);

  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Autoplay, Thumbs]}
        style={{ width: '100%' }}
        spaceBetween={100}
        centeredSlides={true}
        // autoplay={{ delay: 5000 }}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
        className={styles.mainImg}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={`${BASE_URL}${img}`} className={styles.sliderMainImg} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={swiper => setThumbsSwiper(swiper)}
        slidesPerView={images?.length}
        spaceBetween={thumbsDirection === 'horizontal' ? 8 : 16}
        className={styles.thumbs}
        direction={thumbsDirection}
        updateOnWindowResize={false}
      >
        <div className={styles.thumbsContainer}>
          {images?.map((image, index) => (
            <SwiperSlide key={index} className={styles.thumbsSlide}>
              <img
                src={`${BASE_URL}${image}`}
                className={classNames(styles.sliderThumbImg, {
                  [styles.active]: index === activeIndex,
                })}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};
