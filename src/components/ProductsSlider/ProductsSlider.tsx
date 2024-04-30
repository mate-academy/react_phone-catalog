import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

import './ProductsSlider.scss';
import '../../style/title.scss';

type Props = {
  products: Product[];
  unitName: string;
};

export const ProductsSlider: React.FC<Props> = ({ products, unitName }) => {
  const [transition, setTransition] = useState(0);

  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && window.innerWidth < 1200) {
        setIsDesktop(false);
        setIsTablet(true);
      } else if (window.innerWidth >= 1200) {
        setIsTablet(false);
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
        setIsTablet(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [productWidth, setProductWidth] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [frameSize, setFrameSize] = useState(0);
  const [listWidth, setListWidth] = useState(0);
  const [step, setStep] = useState(2);

  const GAP = 16;

  useEffect(() => {
    if (isTablet) {
      setProductWidth(238.6);
      setInnerWidth(window.innerWidth);
      setFrameSize(Math.floor(innerWidth / (productWidth + GAP)));
      setListWidth(products.length * (productWidth + GAP) - 16);
      setStep(2);
    } else if (isDesktop) {
      setProductWidth(272);
      setInnerWidth(1136);
      setFrameSize(4);
      setListWidth(products.length * (productWidth + GAP));
      setStep(2);
    } else if (!isTablet && !isDesktop) {
      setProductWidth(261.6);
      setInnerWidth(window.innerWidth);
      setFrameSize(Math.floor(innerWidth / (productWidth + GAP)));
      setListWidth(products.length * (productWidth + GAP) - 16);
      setStep(1);
    }
  }, [isTablet, isDesktop, productWidth, innerWidth, products.length]);

  const maxTransitionOffset = listWidth - frameSize * (productWidth + GAP);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mouseMoved, setMouseMoved] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  // #region mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    setStartX(e.clientX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
    setMouseMoved(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) {
      return;
    }

    const currentMousePosition =
      e.clientX - (sliderRef.current?.offsetLeft || 0);

    setMouseMoved(currentMousePosition - startX);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - mouseMoved;
    }
  }, [scrollLeft, mouseMoved]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];

    setIsDown(true);
    setStartX(touch.clientX);
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDown) {
      return;
    }

    const touch = e.touches[0];
    const deltaX = startX - touch.clientX;

    sliderRef.current!.scrollLeft = scrollLeft + deltaX;
  };

  const handleTouchEnd = () => {
    setIsDown(false);
  };
  //#endregion

  const goPrev = () => {
    const newTransition = transition - step * (productWidth + GAP);

    setTransition(Math.max(newTransition, 0));
  };

  const goNext = () => {
    const newTransition = transition + step * (productWidth + GAP);

    setTransition(Math.min(newTransition, maxTransitionOffset));
  };

  return (
    <>
      <div className="slider__top">
        <h2 className="title-subtitle slider__name">{unitName}</h2>

        <div className="slider__arrows">
          <button
            type="button"
            className={cn('slider__arrow slider__arrow--left', {
              'slider__arrow--disabled': transition === 0,
            })}
            onClick={goPrev}
            aria-label="Previous"
          />

          <button
            type="button"
            className={cn('slider__arrow', {
              'slider__arrow--disabled': transition >= maxTransitionOffset,
            })}
            onClick={goNext}
            aria-label="Next"
          />
        </div>
      </div>

      <div
        className="slider__cards slider__cards--desktop"
        data-cy="cardsContainer"
        style={{
          width: '1136px',
        }}
      >
        <div
          className="slider__list"
          style={{
            width: `${listWidth}px`,
            transform: `translateX(-${transition}px)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseDown(e)
          }
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseMove(e)
          }
          ref={sliderRef}
        >
          {products.map(product => (
            <Link
              to={`/${product.category}/${product.itemId}`}
              className="slider__link"
              key={product.id}
            >
              <ProductCard product={product} key={product.id} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
