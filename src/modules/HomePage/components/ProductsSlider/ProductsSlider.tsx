/* eslint-disable prettier/prettier */
import 'swiper/css';
import './ProductsSlider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../PhonesPage/components/ProductCard';

type Props = {
  title?: string;
  sortBy?: 'year' | 'discount' | 'random';
};

// eslint-disable-next-line max-len
export const ProductsSlider: React.FC<Props> = ({ title, sortBy }) => {
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null,
  );

  useEffect(() => {
    fetch('./api/products.json')
      .then(res => res.json())
      .then(data => {
        setOriginalProducts(data);
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    if (!swiperInstance) {
      return;
    }

    const handleSlideChange = () => {
      const prev = document.querySelector('.slider-nav--prev');

      if (swiperInstance.isBeginning) {
        prev?.classList.add('is-disabled');
      } else {
        prev?.classList.remove('is-disabled');
      }
    };

    swiperInstance.on('slideChange', handleSlideChange);

    handleSlideChange();

    return () => {
      swiperInstance.off('slideChange', handleSlideChange);
    };
  }, [swiperInstance]);

  useEffect(() => {
    if (!originalProducts.length) {
      return;
    }

    let sorted: Product[];

    switch (sortBy) {
      case 'discount':
        sorted = [...originalProducts].sort(
          (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
        );
        break;
      case 'random':
        sorted = [...originalProducts].sort(() => Math.random() - 0.5);
        break;
      default:
        sorted = [...originalProducts].sort((a, b) => b.year - a.year);
    }

    setProducts(sorted);
  }, [sortBy, originalProducts]);

  return (
    <section className="products-slider">
      <h2 className="section-title">{title}</h2>
      <div className="products-slider-container">
        <div className="slider-nav slider-nav--prev"></div>
        <div className="slider-nav slider-nav--next"></div>
        <Swiper
          onSwiper={setSwiperInstance}
          spaceBetween={16}
          modules={[Navigation]}
          navigation={{
            nextEl: '.slider-nav--next',
            prevEl: '.slider-nav--prev',
          }}
          breakpoints={{
            0: {
              slidesPerView: 'auto',
            },
            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
