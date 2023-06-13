import {
  RefObject, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { Product } from '../../helpers/types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[] | null;
  topAmount: number;
};

export const ProductsSlider: React.FC<Props> = ({
  title, products, topAmount,
}) => {
  const staticContainer = useRef() as RefObject<HTMLDivElement>;
  const dynamicContainer = useRef() as RefObject<HTMLUListElement>;
  const [currTransitionX, setCurrTransitionX] = useState(0);
  const [staticContainerWidth, setStaticContainerWidth] = useState(0);
  const [dynamicContainerWidth, setDynamicContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLastImgs, setLastImgs] = useState(false);

  const rightSlide = () => {
    if (currTransitionX + 2 * staticContainerWidth >= dynamicContainerWidth) {
      setCurrTransitionX(
        dynamicContainerWidth - staticContainerWidth,
      );
      setLastImgs(true);
    } else {
      setCurrTransitionX((currValue) => currValue + staticContainerWidth);
    }
  };

  const leftSlide = () => {
    setLastImgs(false);
    if (currTransitionX - staticContainerWidth <= 0) {
      setCurrTransitionX(0);
    } else {
      setCurrTransitionX((currValue) => currValue - staticContainerWidth);
    }
  };

  useLayoutEffect(() => {
    setStaticContainerWidth(staticContainer.current?.clientWidth || 0);
    setDynamicContainerWidth(dynamicContainer.current?.clientWidth || 0);
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setStaticContainerWidth(staticContainer.current?.clientWidth || 0);

    if (isLastImgs) {
      setCurrTransitionX(
        (dynamicContainer.current?.clientWidth || 0) - staticContainerWidth,
      );
    }
  }, [windowWidth]);

  return (
    <div className="products-slider">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>
        <button
          type="button"
          aria-label="Mute volume"
          className="
            products-slider__button-left
            icon-button"
          onClick={leftSlide}
          disabled={currTransitionX === 0}
        />
        <button
          type="button"
          aria-label="Mute volume"
          className="
            products-slider__button-right
            icon-button"
          onClick={rightSlide}
          disabled={isLastImgs}
        />
      </div>

      <div
        className="products-slider__static-container"
        ref={staticContainer}
      >
        <ul
          ref={dynamicContainer}
          className="products-slider__dynamic-container"
          style={{
            transform: `translateX(${-currTransitionX}px)`,
            transitionDuration: '1000ms',
          }}
        >
          {products?.slice(0, topAmount).map(product => (
            <li
              key={product.id}
              className="products-slider__item"
              data-cy="cardsContainer"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
