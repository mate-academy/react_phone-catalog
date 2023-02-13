import './ProductsListWithSlider.scss';

import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import { ProductCard } from '../../../../common/ProductCard/ProductCard';

export const ProductsListWithSlider: React.FC<any> = (
  { products, title },
) => {
  const { pathname } = useLocation();
  const [width, setWidth] = useState(0);
  const [initialWidth, setInitialWidth] = useState<any>(0);
  const ref = useRef<any>(null);

  const maxMargin = initialWidth * (products.length - 5);
  const moveRight = () => {
    if (ref.current && ref) {
      setInitialWidth(ref.current.offsetWidth);
      if (width <= maxMargin) {
        setWidth(width + ref.current.offsetWidth);
      }
    }
  };

  const moveLeft = () => {
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
            image="icons/Chevron (Arrow Left).svg"
            alt="<"
            // disabled={isDisabled}
          />
          <Button
            className="arrow right small"
            onClick={moveRight}
            image="icons/Chevron (Arrow Right).svg"
            alt=">"
          />
        </div>
      </div>
      <ul
        className="product-list"
        style={{ marginLeft: `${-width}px`, transition: 'margin-left .3s' }}
      >
        {products.map((p: any) => {
          return (
            <li
              key={p.id}
              ref={ref}
              className="product-list__slider-item"
              aria-hidden
            >

              <ProductCard
                product={p}
                products={products}
                link={pathname !== '/home'
                  ? `../${p.id}`
                  : `../${p.category}/${p.id}`}
              />
            </li>

          );
        })}
      </ul>

    </div>
  );
};
