/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC, useRef } from 'react';
import cn from 'classnames';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../shared/components/ProductCard';
import next from '../../../../assets/images/icons/arrow-right.svg';
import prev from '../../../../assets/images/icons/arrow-left.svg';

import s from './ProductsSlider.module.scss';

interface Props {
  products: Product[];
  priceMode?: 'discount' | 'full';
}
export const ProductsSlider: FC<Props> = ({ products, priceMode = 'full' }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div className={s.container}>
      <button
        className={cn(s.sliderNavButton, s.sliderPrevButton)}
        aria-label="Previous slide"
      >
        <img src={prev} alt="Previous" />
      </button>
      <button
        className={cn(s.sliderNavButton, s.sliderNextButton)}
        aria-label="Next slide"
      >
        <img src={next} alt="Next" />
      </button>

      <div ref={sliderRef} className={s.sliderWrapper}>
        <div className={s.sliderRow}>
          {products.map(product => (
            <div key={product.id}>
              <ProductCard product={product} priceMode={priceMode} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
