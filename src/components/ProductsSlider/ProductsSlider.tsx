import { useContext, useEffect, useState } from 'react';
import { ProductsType } from '../../types/Products';
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

export type SliderItems = 'Hotest' | 'Newest' | 'Suggested';

type Props = {
  itemsType: SliderItems;
  title: string;
};

const CARDS_GAP = 16;
const TABLET_WIDTH = 640;
const DESKTOP_WIDTH = 1200;

export const ProductsSlider: React.FC<Props> = ({ itemsType, title }) => {
  const { products, loading, error } = useContext(ProductContext);

  const swiper = useSwiper();

  const [itemsList, setItemsList] = useState<ProductsType[]>([]);

  const getSuggestedProducts = () => {
    const arrayCopy = [...products];

    const result = [];

    while (arrayCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);

      result.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }

    return result;
  };

  const findItems = () => {
    if (itemsType === 'Suggested') {
      setItemsList(getSuggestedProducts());

      return;
    }

    setItemsList(sortFunction(itemsType, products).slice(0, 15));
  };

  useEffect(() => {
    findItems();
  }, [products]);

  const [width, setWidth] = useState(window.innerWidth);
  const [itemsNum, setItemsNum] = useState(1.5);

  const changeItemsNum = () => {
    if (width >= DESKTOP_WIDTH) {
      setItemsNum(4);
    }

    if (width >= TABLET_WIDTH && width < DESKTOP_WIDTH) {
      setItemsNum(2.5);
    }

    if (width < TABLET_WIDTH) {
      setItemsNum(1.5);
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    changeItemsNum();
  }, [width]);

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
