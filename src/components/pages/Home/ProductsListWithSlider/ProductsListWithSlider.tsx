import './ProductsListWithSlider.scss';

import { useState, useRef } from 'react';
import { Button } from '../../../../common/Button/Button';
import { ProductCard } from '../../../../common/ProductCard/ProductCard';

export const ProductsListWithSlider: React.FC<any> = (
  { products, title },
) => {
  const [width, setWidth] = useState(0);
  const [initialWidth, setInitialWidth] = useState<any>(0);
  // const [isDisabled, setIsDisabled] = useState(false);
  const ref = useRef<any>(null);

  const maxMargin = initialWidth * (products.length - 5);
  const moveRight = (event: any) => {
    if (ref.current && ref) {
      setInitialWidth(ref.current.offsetWidth);
      event.preventDefault();
      if (width <= maxMargin) {
        setWidth(width + ref.current.offsetWidth);
      }
    }
  };

  const moveLeft = (event: any) => {
    event.preventDefault();
    if (!ref.current || !ref) {
      return;
    }

    if (width > 0) {
      setWidth(width - ref.current.offsetWidth);
    }
    // if(visibleBanner <= 0){
    //   return;
    // }
  };

  return (
    <div className="products-list-with-slider__block">
      <div className="products-list-with-slider__header">
        <h1 className="block__title">{title}</h1>
        <div className="slider-buttons">
          <Button
            className="arrow left small"
            onClick={moveLeft}
            image="/icons/Chevron (Arrow Left).svg"
            alt="<"
            // disabled={isDisabled}
          />
          <Button
            className="arrow right small"
            onClick={moveRight}
            image="/icons/Chevron (Arrow Right).svg"
            alt=">"
          />
        </div>
      </div>
      <ul
        className="product-list"
        style={{ marginLeft: `${-width}px` }}
      >
        {products.map((product: any) => {
          return (
            <li
              key={product.id}
              ref={ref}
            >
              <ProductCard
                product={product}
              />

            </li>

          );
        })}
      </ul>

    </div>
  );
};
