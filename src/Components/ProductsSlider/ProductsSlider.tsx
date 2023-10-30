import { useState } from 'react';
import { Phone } from '../../types/Phone';
import { ProductItem } from '../ProductItem/ProductItem';
import { ChevronRight } from '../../SVG/ChevronRight/ChevronRight';
import { ChevronLeft } from '../../SVG/ChevronLeft/ChevronLeft';
import './ProductsSlider.scss';

type Props = {
  productArray: Phone[];
  description: string;
};

export const ProductsSlider: React.FC<Props> = (
  {
    productArray, description,
  },
) => {
  const [currentOffset, setCurrentOffset] = useState(0);

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__top">
        <h3 className="ProductsSlider__title">
          {description}
        </h3>
        <div className="ProductsSlider__btns">
          <button
            type="button"
            className="ProductsSlider__btn"
            onClick={() => {
              if (currentOffset > 0) {
                setCurrentOffset(prev => prev - 1);
              }
            }}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="ProductsSlider__btn"
            onClick={() => {
              if (currentOffset < productArray.length - 4) {
                setCurrentOffset(prev => prev + 1);
              }
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="ProductsSlider__products-wrapper">
        <div
          className="ProductsSlider__products"
          style={{ transform: `translateX(-${currentOffset * 288}px)` }}
        >
          {
            productArray.length > 0 && (
              productArray.map(el => {
                return (
                  <div
                    key={el.id}
                    className="ProductsSlider__product"
                  >
                    <ProductItem info={el} />
                  </div>
                );
              })
            )
          }
        </div>
      </div>
    </div>
  );
};
