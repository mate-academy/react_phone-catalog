import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ProductsSwiper.scss';
import { Button } from '../Button/Button';

type Props = {
  products: Product[];
  discount?: boolean;
  title: string;
};

export const ProductsSwiper: React.FC<Props> = ({
  products,
  discount,
  title,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const isDiscount = discount ? true : false;

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="swiper">
      <div className="swiper__container">
        <div className="swiper__topbar">
          <h2 className="swiper__title">{title}</h2>
          <div className="swiper__buttons">
            <Button
              ref={prevRef}
              className={`
                button
                button-prev
                ${isBeginning ? 'button-prev--disabled' : ''}
              `}
            />
            <Button
              ref={nextRef}
              className={`
                button
                button-next
                ${isEnd ? 'button-next--disabled' : ''}
              `}
            />
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          spaceBetween={16}
          slidesPerView="auto"
          loop={false}
          onInit={swiper => setSwiperInstance(swiper)}
          onSlideChange={swiper => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} discount={isDiscount} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
