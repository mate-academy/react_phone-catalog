import { FC, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Heading from '../../../UI/Heading/Heading';
import Product from '../../../types/Product';
import s from './SliderProducts.module.css';
import Button from '../../../UI/Buttons/Button';
import ProductCard from '../../shared/ProductCard/ProductCard';

interface Props {
  sliderTitle: string;
  products: Product[];
  totalPages: number;
}

const SliderProducts: FC<Props> = ({ sliderTitle, products, totalPages }) => {
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
    <div className={s.content}>
      <div className="container">
        <div className={s.header_content}>
          <Heading className={s.title} as="h2">
            {sliderTitle}
          </Heading>
          <ul className={s.navigation}>
            <li>
              <Button
                variant="pagination"
                size={[32, 32]}
                onClick={handlePrevClick}
                disabled={currentPage === 1}
              >
                <img src="img/icons/arrow-left-dark-icon.svg" alt="Previous" />
              </Button>
            </li>

            <li>
              <Button
                variant="pagination"
                size={[32, 32]}
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
              >
                <img src="img/icons/arrow-right-dark-icon.svg" alt="Next" />
              </Button>
            </li>
          </ul>
        </div>
        <div className="product-slider">
          <Swiper
            onSwiper={swiper => (swiperRef.current = swiper)}
            onSlideChange={updateCurrentPage}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={4}
            speed={800}
            autoplay={{
              delay: 10000, // Затримка між автоскролом у мілісекундах
              disableOnInteraction: false, // Продовжити автоскрол навіть після взаємодії користувача
            }}
            breakpoints={{
              1200: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 16,
              },
              320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 16,
              },
            }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <div key={product.id} className={s.item}>
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderProducts;
