import { useRef } from 'react';
import { Container } from '../Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import cn from 'classnames';
import './CardsSlider.scss';
import { Product } from '../../../types/types';
import { ProductItem } from '../../../types/ProductItem';
import { CardTemplate } from '../CardTemplate';

type Props = {
  products: Product[] | ProductItem[];
  discount: boolean;
  title: string;
};

export const CardsSlider: React.FC<Props> = ({ products, discount, title }) => {
  const swiperRef = useRef<SwiperCore>();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="cards-slider">
      <Container>
        <h2 className="cards-slider__title">{title}</h2>
        <div className="cards-slider__button--field">
          <button
            ref={prevRef}
            type="button"
            className="cards-slider__button margin-right"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <div className={cn('icon', 'icon_left')} />
          </button>

          <button
            ref={nextRef}
            type="button"
            className="cards-slider__button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <div className={cn('icon', 'icon_right')} />
          </button>
        </div>
      </Container>
      <div className="cards-slider__container">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          loop={false}
          onBeforeInit={swiper => {
            swiperRef.current = swiper;
          }}
          slidesPerView="auto"
          spaceBetween={16}
          className="photoSwiper"
        >
          {products.map(product => (
            <SwiperSlide key={product.id} style={{ width: 'auto' }}>
              <CardTemplate
                product={product}
                productId={product.itemId}
                discount={discount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
