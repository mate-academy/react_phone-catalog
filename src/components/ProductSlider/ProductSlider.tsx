import React, {
  useMemo, useState,
} from 'react';
import { Product } from '../../Types/Product';
import './ProductSlider.scss';
import Arrow_right from '../../icons/Arrow_right.svg';
import Arrow_left from '../../icons/Arrow_left.svg';
import ProductCard from '../ProductCard/ProductCard';
/*
    eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-noninteractive-element-interactions
  */

type Props = {
  title: string;
  products: Product[];
};

const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [scroll, setScroll] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const cardWidth = 263.600;
  const gap = 16;
  const productsLength = products.length;

  const sliderTransform = useMemo(() => {
    return scroll * cardWidth + gap * scroll;
  }, [scroll]);

  const transform = `translateX(-${sliderTransform}px)`;

  const clickPrev = () => {
    if (scroll === 0) {
      return;
    }

    setScroll(scroll - 1);
  };

  const clickNext = () => {
    if (scroll === productsLength - (1 + 4)) {
      return;
    }

    setScroll(scroll + 1);
  };

  const handleTouchStart = (event:React.TouchEvent) => {
    const firstTouch = event.touches[0].clientX;

    setTouchPosition(firstTouch);
  };

  const moveTouch = (event:React.TouchEvent) => {
    if (touchPosition === null) {
      return;
    }

    const currentTouch = event.touches[0].clientX;
    const diff = touchPosition - currentTouch;

    if (diff > 5) {
      clickNext();
    }

    if (diff < -5) {
      clickPrev();
    }

    setTouchPosition(null);
  };

  return (
    <div className="main__section slider-products">
      <div className="slider-products__top">
        <h1 className="slider-products__title">
          {title}
        </h1>
        <div className="slider-products__buttons">
          <button
            disabled={scroll === 0}
            className="button"
            type="button"
            onClick={() => clickPrev()}
          >
            <img src={Arrow_left} alt="" />
          </button>
          <button
            disabled={scroll === productsLength - (1 + 4)}
            className="button"
            type="button"
            onClick={() => clickNext()}
          >
            <img src={Arrow_right} alt="" />
          </button>
        </div>
      </div>
      <div
        className="slider-products__content"
        onTouchStart={event => handleTouchStart(event)}
        onTouchMove={event => moveTouch(event)}
      >
        <ul
          onMouseMove={console.log}
          tabIndex={-1}
          className="slider-products__list"
          style={
            { transform, transition: '0.4s' }
          }
        >
          {products.map(product => (
            <li
              key={product.id}
              className="slider-products__item"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSlider;
