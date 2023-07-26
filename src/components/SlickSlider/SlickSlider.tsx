import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { sortProducts } from '../../helpers/sortHelper';
import { SortType } from '../../types/SortType';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slickSlider.scss';

export type Props = {
  products: Product[],
  sortBy: SortType,
};

export const SlickSlider: React.FC<Props> = ({ products, sortBy }) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const sortedProducts = sortProducts(products, sortBy);

    setVisibleProducts(sortedProducts);
  }, [products]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
          arrows: false,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {visibleProducts.map((item: Product) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </Slider>
  );
};
