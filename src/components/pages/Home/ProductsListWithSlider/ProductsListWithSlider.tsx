import './ProductsListWithSlider.scss';

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import { ProductCard } from '../../../../common/ProductCard/ProductCard';
import { Product } from '../../../../types/types';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsListWithSlider: React.FC<Props> = (
  { products, title },
) => {
  const { pathname } = useLocation();
  const [width, setWidth] = useState(0);
  const [initialWidth, setInitialWidth] = useState<number>(285);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [maxMargin, setMaxMargin] = useState<number>(0);
  const ref = useRef<any>(null);
  const containerRef = useRef<any>(null);

  const moveRight = () => {
    setMaxMargin(initialWidth
      * (products.length - 1 - (containerWidth / initialWidth)));
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

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
  }, []);

  return (
    <div className="products-list-with-slider__block">
      <div className="products-list-with-slider__header">
        <h1 className="block__title">{title}</h1>
        <div className="slider-buttons">
          <Button
            className="arrow left small"
            onClick={moveLeft}
            image="icons/Chevron (Arrow Left).svg"
            alt="arrow-left"
          />
          <Button
            className="arrow right small"
            onClick={moveRight}
            image="icons/Chevron (Arrow Right).svg"
            alt="arrow-right"
          />
        </div>
      </div>
      <ul
        className="product-list"
        style={{ marginLeft: `${-width}px`, transition: 'margin-left .5s' }}
        ref={containerRef}
      >
        {products.map((p: Product) => {
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
