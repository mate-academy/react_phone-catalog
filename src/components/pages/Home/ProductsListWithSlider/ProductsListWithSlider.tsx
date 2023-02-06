import './ProductsListWithSlider.scss';

import { useState, useRef } from 'react';
import { ProductCard } from '../../../../helpers/ProductCard/ProductCard';
import { Button } from '../../../../helpers/Button/Button';

export const ProductsListWithSlider: React.FC<any> = (
  { products, title },
) => {
  const [width, setWidth] = useState(0);
  const [initialWidth, setInitialWidth] = useState<any>(0);
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
                key={product.id}
                productImg={undefined}
              />

            </li>

          );
        })}
      </ul>

    </div>
  );
};
