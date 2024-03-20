import React from 'react';
import clsx from 'clsx';
import { Typography } from '../../base';
import { ProductCard } from '../../components';
import { Product } from '../../../types/Product';
import { Slider, SliderItem } from '../Slider';

import './ProductCardSlider.scss';

type Props = {
  products: Product[];
  title?: string;
  className?: string;
};

export const ProductCardSlider: React.FC<Props> = ({
  products,
  title = '',
  className = '',
}) => {
  return (
    <div className={clsx('product-card-slider', className && className)}>
      {title && (
        <Typography
          type="title"
          level="2"
          className="product-card-slider__title"
        >
          {title}
        </Typography>
      )}
      <Slider
        slidesToShow={4}
        stepBy={4}
        duration={800}
        navDots={false}
        className={clsx('product-card-slider', className)}
        responsive={[
          {
            breakpoint: 992,
            settings: {
              slidesPerSlide: 2,
              stepBy: 2,
            },
          },

          {
            breakpoint: 481,
            settings: {
              slidesPerSlide: 1,
              stepBy: 1,
            },
          },
        ]}
      >
        {products.map(product => (
          <SliderItem key={product.id}>
            <ProductCard
              id={product.id}
              item={product}
              name={product.name}
              productUrl={`../../${product.category}/${product.itemId}`}
              price={product.price}
              fullPrice={product.fullPrice}
              image={product.image}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          </SliderItem>
        ))}
      </Slider>
    </div>
  );
};
