import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';

import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import './ProductSlider.scss';

import { ProductCard } from '../card/ProductCard';
import { Product } from '../../types/Product';

import { ReactComponent as ArrowLeft }
  from '../../icons/Chevron (Arrow Left).svg';

import { ReactComponent as ArrowRight }
  from '../../icons/Chevron (Arrow Right).svg';

type Props = {
  title: string;
  slider: string;
  products: Product[];
};

const ProductSlider: React.FC<Props> = ({
  title,
  slider,
  products,
}) => {
  const hasDiscount = slider === 'prices';

  return (
    <div className="product-slider">
      <div className="product-title-container">
        <h1 className="product-title">{title}</h1>
        <div className="slider-nav">
          <div className={`${slider}-button-prev slider-icon`}>
            <ArrowLeft className="icon" />
          </div>

          <div className={`${slider}-button-next slider-icon`}>
            <ArrowRight className="icon" />
          </div>
        </div>
      </div>

      <Swiper
        className="slider-container"
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={13}
        wrapperClass="product-wrapper"
        navigation={{
          nextEl: `.${slider}-button-next`,
          prevEl: `.${slider}-button-prev`,
        }}
      >
        {products.map(product => (
          <SwiperSlide
            key={product.id}
            className="product-slide"
          >
            <Link to={`/phones/${product.itemId}`}>
              <ProductCard
                product={product}
                discount={hasDiscount}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
