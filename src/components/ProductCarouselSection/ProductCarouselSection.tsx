/* eslint-disable max-len */
import React, { useRef } from 'react';
import { Product } from '../../types/Product';

import { ProductCarousel } from './components/ProductCarousel';

import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductCarouselSection.module.scss';

type Props = {
  sectionTitle?: string;
  products?: Product[];
};

export const ProductCarouselSection: React.FC<Props> = ({
  sectionTitle,
  products = [],
}) => {
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h2>{sectionTitle}</h2>
          <div className={styles['product-carousel__navigation-warpper']}>
            <button
              ref={prevBtnRef}
              className="button-box button-box--sm button--arrow-left"
            ></button>
            <button
              ref={nextBtnRef}
              className="button-box button-box--sm button--arrow-right"
            ></button>
          </div>
        </div>
        <ProductCarousel
          products={products}
          prevBtnRef={prevBtnRef}
          nextBtnRef={nextBtnRef}
        />
      </div>
    </section>
  );
};
