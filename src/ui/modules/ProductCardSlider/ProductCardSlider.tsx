/* eslint-disable prettier/prettier */
import React from 'react';
import clsx from 'clsx';
import { Typography } from '../../base';
import { ProductCard, ProductCardSkeleton } from '../../components';
import { Product } from '../../../types/Product';
import { Slider, SliderItem } from '../Slider';
import { getRandomKey } from '../../../utils';

import './ProductCardSlider.scss';

type Props = {
  products: Product[];
  title?: string;
  className?: string;
  isLoadProducts?: boolean;
};

export const ProductCardSlider: React.FC<Props> = ({
  products,
  title = '',
  className = '',
  isLoadProducts = false,
}) => {
  const skeletonItems = new Array(4).fill(0).map(() => {
    return {
      id: `sk-${getRandomKey()}`,
      item: <ProductCardSkeleton />,
    };
  });

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
        navArrows={!isLoadProducts}
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
        {isLoadProducts
          && skeletonItems.map(item => (
            <SliderItem key={item.id}>{item.item}</SliderItem>
          ))}
        {!isLoadProducts
          && products.map(product => (
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
