import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';

import { Card } from '../Card';
import { Product } from '../../types/Product';

import 'swiper/css';
import classes from './ProductsSlider.module.scss';

type Props = {
  items: Product[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({ items, title }) => {
  const swiperBreakpoints = {
    510: { slidesPerView: 2 },
    760: { slidesPerView: 3 },
    1136: { slidesPerView: 4 },
  };

  const elementRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      setHeight(elementRef.current.offsetHeight);
    }
  }, []);

  return (
    <section className={classes.ProductsSlider}>
      <h2 className={classes.ProductsSlider__title}>{title}</h2>
      <div ref={elementRef}>
        <Swiper
          className={classes.ProductsSlider__container}
          modules={[Navigation, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={swiperBreakpoints}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {items.map(item => (
            <SwiperSlide
              key={+item.id}
              className={classes.ProductsSlider__slide}
              style={{ height: height ? height : 'min-content' }}
            >
              <Card product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
