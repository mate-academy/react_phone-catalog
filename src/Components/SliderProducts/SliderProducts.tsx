import './SliderProducts.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useRef, useState } from 'react';
import { GetProducts } from '../../services/GetProducts';
import { Product } from '../../types/Product';
import classNames from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import { NavigationOptions } from 'swiper/types';

type Props = {
  title: string;
};

export const SliderProducts: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const prevRef = useRef<HTMLImageElement>(null);
  const nextRef = useRef<HTMLImageElement>(null);

  const shuffleArray = (array: Product[]) => {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  useEffect(() => {
    GetProducts().then(data => {
      let filtered = data;

      if (title === 'brand new models') {
        filtered = data.filter(d => d.price > 1300);
      }

      const shuffled = shuffleArray(filtered);

      setProducts(shuffled.slice(0, 20));
    });
  }, [title]);

  return (
    <div className="slider-products">
      <div className="slider-products__wrapper">
        <div className="slider-products__icon-wrapper">
          <h2 className="slider-products__title">{title}</h2>
          <div className="slider-products__slide-icons">
            <img
              ref={prevRef}
              src="img/ui-kit/Slider-button-small-right.png"
              alt="slider-button"
              className={classNames(
                'slider-products__slide-icon--left',
                'swiper-button-prev',
              )}
            ></img>

            <img
              ref={nextRef}
              src="img/ui-kit/Slider-button-small-right.png"
              alt="slider-button"
              className={classNames(
                'slider-products__slide-icon--right',
                'swiper-button-next',
              )}
            ></img>
          </div>
        </div>

        <div className="slider-products__products">
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={16}
            navigation={{
              nextEl: '.slider-products__slide-icon--right',
              prevEl: '.slider-products__slide-icon--left',
            }}
            modules={[Navigation]}
            onBeforeInit={swiper => {
              if (swiper.params.navigation) {
                const navigation = swiper.params
                  .navigation as NavigationOptions;

                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }

              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {products.map(product => (
              <SwiperSlide key={product.id}>
                <div className="slider-products__product-wrapper">
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
