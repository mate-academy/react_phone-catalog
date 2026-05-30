/* eslint-disable import/no-extraneous-dependencies */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// My styles
import styles from './ProductSlider.module.scss';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ProductCard } from '../../shared/ProductCard/ProductCard';
import { Device } from '../../types';

interface ProductSliderProps {
  devicesForDisplay: Device[];
  title?: string;
  type: 'simple' | 'full';
}

const breakpoints = [
  { width: 535, slides: 1 },
  { width: 768, slides: 2 },
  { width: 1024, slides: 3 },
  { width: Infinity, slides: 4 },
];

const getSlidesPerView = (width: number) => {
  return breakpoints.find(bp => width <= bp.width)?.slides || 1;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  devicesForDisplay,
  title,
  type,
}) => {
  const swiperRef = useRef<Swiper | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [slidesPerView, setSlidesPerView] = useState(() =>
    getSlidesPerView(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    // Run on mount in case width changed since initial render
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.productSlider__Container}>
      <div className={styles.productSlider__Header}>
        {type === 'full' && (
          <h1 className={styles.productSlider__Title}>{title}</h1>
        )}

        {type === 'full' && (
          <div className={styles.productSlider__Navigation}>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className={styles.productSlider__Button}
              disabled={isBeginning}
            >
              <ChevronLeft className={styles.productSlider__ButtonIcon} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className={styles.productSlider__Button}
              disabled={isEnd}
            >
              <ChevronRight className={styles.productSlider__ButtonIcon} />
            </button>
          </div>
        )}
      </div>
      <div className={styles.productSlider__Container}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          slidesPerGroup={slidesPerView}
          onSwiper={swiper => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className={styles.sliderRoot}
        >
          {devicesForDisplay.map(device => (
            <SwiperSlide className={styles.swiperSlide} key={device.id}>
              <ProductCard device={device} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
