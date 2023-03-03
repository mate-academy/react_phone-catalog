/* eslint-disable import/no-cycle */
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
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [maxMargin, setMaxMargin] = useState<number>(0);
  const [toggled, setToggled] = useState<boolean>(false);
  const [leftButtonClass, setLeftButtonClass] = useState<string>('');
  const [rightButtonClass, setRightButtonClass] = useState<string>('');
  const ref = useRef<HTMLLIElement>(null);
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  const moveRight = () => {
    setToggled(!toggled);
    setRightButtonClass('');
    if (width > maxMargin) {
      return;
    }

    if (!ref.current) {
      return;
    }

    setWidth(width + ref.current.offsetWidth);
    setMaxMargin(ref.current.offsetWidth * (products.length
      - 1 - Math.ceil(containerWidth / ref.current.offsetWidth)));
  };

  const moveLeft = () => {
    setLeftButtonClass('');
    if (!ref.current || !ref) {
      return;
    }

    if (width > 0) {
      setWidth(width - ref.current.offsetWidth);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    if (width > 0) {
      setLeftButtonClass('button-left__active');
      if (width <= maxMargin) {
        setRightButtonClass('button-right__active');

        return;
      }

      return;
    }

    setRightButtonClass('button-right__active');
  }, [width]);

  return (
    <div
      className="products-list-with-slider__block"
      ref={containerRef}
    >
      <div className="products-list-with-slider__header">
        <h1 className="block__title">{title}</h1>
        <div className="slider-buttons">
          <Button
            className="arrow left small"
            onClick={moveLeft}
            imageClass={leftButtonClass}
            image="icons/Chevron (Arrow Left).svg"
            alt="arrow-left"
          />
          <Button
            className="arrow right small"
            onClick={moveRight}
            imageClass={rightButtonClass}
            image="icons/Chevron (Arrow Right).svg"
            alt="arrow-right"
          />
        </div>
      </div>
      <ul
        className="product-list"
        style={{ marginLeft: `${-width}px`, transition: 'margin-left .5s' }}
      >
        {products.map((p: Product) => {
          return (
            <li
              key={p.id}
              ref={ref}
              className="product-list__slider-item"
              aria-hidden
            >
              <div className="product-list__slider-card">
                <ProductCard
                  product={p}
                  products={products}
                  link={pathname !== '/home'
                    ? `../${p.id}`
                    : `../${p.category}/${p.id}`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
