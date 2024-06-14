import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { FC, useRef, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '../../../UI/Buttons/Button';
import Heading from '../../../UI/Heading/Heading';
import Loader from '../Loader/Loader';
import Product from '../../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import { Swiper as SwiperType } from 'swiper/types';
import styles from './SliderProducts.module.css';

interface Props {
  sliderTitle: string;
  products: Product[];
  totalPages: number;
  isLoading: boolean;
  isError: boolean;
}

const SliderProducts: FC<Props> = ({
  sliderTitle,
  products,
  totalPages,
  isLoading,
  isError,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }

    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }

    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const updateCurrentPage = () => {
    if (swiperRef.current) {
      setCurrentPage(swiperRef.current.activeIndex / 4 + 1);
    }
  };

  return (
    <div className={styles.content}>
      <div className="container">
        <div className={styles.header_content}>
          <Heading className={styles.title} as="h2">
            {sliderTitle}
          </Heading>
          <ul className={styles.navigation}>
            <li>
              <Button
                variant="icon"
                size={[32, 32]}
                onClick={handlePrevClick}
                disabled={currentPage === 1}
              >
                <GoChevronLeft size={16} />
              </Button>
            </li>

            <li>
              <Button
                variant="icon"
                size={[32, 32]}
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
              >
                <GoChevronRight size={16} />
              </Button>
            </li>
          </ul>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className={styles.product__slider}>
          Error loading data. Please try again later.
        </p>
      ) : (
        <div className={styles.product__slider}>
          <Swiper
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChange={updateCurrentPage}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={4}
            speed={800}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.5,
                slidesPerGroup: 3,
                spaceBetween: 16,
              },
              320: {
                slidesPerView: 1.4,
                slidesPerGroup: 1,
                spaceBetween: 16,
              },
            }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <div key={product.id} className={styles.item}>
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default SliderProducts;
