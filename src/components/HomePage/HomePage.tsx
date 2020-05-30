import React from 'react';
import { BigCarousel } from '../BigCarousel';
import { ProductCarousel } from '../ProductCarousel';
import { NavByImg } from '../NavByImg';

type Props = {
  products: ProductItem[];
};

export const HomePage: React.FC<Props> = ({ products }) => (
  <>
    <BigCarousel itemWidth={1040} />
    <ProductCarousel wigthSlides={-101.55} title="Hot prices" products={products} />
    <NavByImg />
    <ProductCarousel wigthSlides={-101.55} title="Brand new models" products={products} />
  </>
);
