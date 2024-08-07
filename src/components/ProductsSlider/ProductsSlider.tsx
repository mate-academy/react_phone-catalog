import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { ProductCard } from '../ProductCard';
import React from 'react';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
  showFullPrice?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  products,
  showFullPrice = false,
}) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
  };

  const sortedProducts = products.sort((a, b) => b.fullPrice - a.fullPrice);

  return (
    <div className="products-slider">
      <Slider {...settings}>
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            withFullPrice={showFullPrice}
          />
        ))}
      </Slider>
    </div>
  );
};
