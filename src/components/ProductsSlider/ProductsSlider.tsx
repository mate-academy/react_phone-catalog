import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
import { Loader } from '../Loader';
import { sortFunction } from '../../utils/Sort';
import { ArrowIcon } from '../Icons/Arrow';
import { ProductContext } from '../Contexts/ProductsContext';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { DESKTOP_WIDTH, TABLET_WIDTH } from '../../types/Constantes';

export type SliderItems = 'Hotest' | 'Newest' | 'Suggested';

type Props = {
  itemsType: SliderItems;
  title: string;
};

const CARDS_GAP = 16;

export const ProductsSlider: React.FC<Props> = ({ itemsType, title }) => {
  const { products, loading, error } = useContext(ProductContext);

  const swiper = useSwiper();

  const getSuggestedProducts = useCallback(() => {
    const arrayCopy = [...products];

    const result = [];

    while (arrayCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);

      result.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }

    return result;
  }, [products]);

  const itemsList = useMemo(() => {
    if (itemsType === 'Suggested') {
      return getSuggestedProducts();
    }

    return sortFunction(itemsType, products).slice(0, 15);
  }, [getSuggestedProducts, itemsType, products]);

  const [width, setWidth] = useState(window.innerWidth);

  const itemsNum = useMemo(() => {
    if (width >= DESKTOP_WIDTH) {
      return 4;
    }

    if (width >= TABLET_WIDTH && width < DESKTOP_WIDTH) {
      return 2.5;
    }

    return 1.5;
  }, [width]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const prevDisabled = activeIndex === 0;
  const nextDisabled = activeIndex === itemsList.length - 1;

  return (
    <div className={styles.productsSlider}>
      <div className={styles.sliderTitle}>
        <h2>{title}</h2>

        <div className={styles.titleButtons}>
          <button
            className="button toggle backBtn prev"
            onClick={() => swiper.slidePrev()}
            disabled={prevDisabled}
          >
            <span className="icon">
              <ArrowIcon disabled={prevDisabled} />
            </span>
          </button>
          <button
            className="button toggle next"
            onClick={() => swiper.slideNext()}
            disabled={nextDisabled}
          >
            <span className="icon">
              <ArrowIcon disabled={nextDisabled} />
            </span>
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && !error && itemsList.length > 0 && (
        <div className={styles.wrapper}>
          <Swiper
            slidesPerView={itemsNum}
            spaceBetween={CARDS_GAP}
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
            }}
            modules={[Navigation]}
            onSlideChange={s => setActiveIndex(s.activeIndex)}
          >
            {itemsList.map(item => (
              <SwiperSlide key={item.id}>
                <li key={item.id} className={styles.item}>
                  <ProductCard productItem={item} />
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
