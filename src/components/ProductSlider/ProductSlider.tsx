import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { ProductCard } from '../ProductCard/ProductCard';
// eslint-disable-next-line
import { ReactComponent as ArrowLeft } from '../../assets/icons/Chevron (Arrow Left).svg';
// eslint-disable-next-line
import { ReactComponent as ArrowRight } from '../../assets/icons/Chevron (Arrow Right).svg';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import './ProductSlider.scss';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  title: string;
};

export const ProductSlider: FC<Props> = ({ title, products }) => {
  return (
    <section className="product-slider">
      <div className="product-topcontainer">
        <h1 className="product-title">
          {title}
        </h1>
        <div className="slider-arrows">
          <div className="slider-button-prev slider-icon">
            <ArrowLeft className="icon" />
          </div>
          <div className="slider-button-next slider-icon">
            <ArrowRight className="icon" />
          </div>
        </div>
      </div>

      <Swiper
        className="slider-container"
        wrapperClass="wrapper"
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={12}
        navigation={{
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        }}
      >
        {products.map(product => (
          <SwiperSlide
            className="product-slide"
            key={product.id}
            data-cy="cardsContainer"
          >
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
