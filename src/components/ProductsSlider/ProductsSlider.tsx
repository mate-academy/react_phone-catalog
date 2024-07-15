import React, { useEffect, useRef, useState } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../helpers/types/Product';
import { ProductCard } from '../ProductCard';
import { ButtonNav } from '../ButtonNav';

type Props = {
  title: string;
  products: Product[];
};

const TABLET_MIN_WIDTH = 744;
const DESKTOP_MIN_WIDTH = 1024;

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [buttonWidth, setButtonWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [countVisibleCarts, setCountVisibleCarts] = useState(2);
  const [step, setStep] = useState(0);
  const [widthGap, setWidthGap] = useState(10);

  const refButton = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentWidth = window.innerWidth;

    let newCountVisibleCarts = 1;

    if (currentWidth >= TABLET_MIN_WIDTH && currentWidth < DESKTOP_MIN_WIDTH) {
      newCountVisibleCarts = 3;
    } else if (currentWidth >= DESKTOP_MIN_WIDTH) {
      newCountVisibleCarts = 4;
    }

    let newWidthGap = 10;

    if (currentWidth >= DESKTOP_MIN_WIDTH) {
      newWidthGap = 16;
    }

    setWidthGap(newWidthGap);
    setCountVisibleCarts(newCountVisibleCarts);
  });

  const countGaps = countVisibleCarts - 1;

  // eslint-disable-next-line
  const move =
    step * ((contentWidth - countGaps * widthGap) / countVisibleCarts) + //eslint-disable-line
    widthGap * step;

  const canMoveLeft = step !== 0;
  const canMoveRight = step !== products.length - countVisibleCarts;

  const styleCart = {
    transition: `300ms`,
    transform: `translateX(-${move}px)`,
  };

  useEffect(() => {
    if (!refButton.current) {
      return;
    }

    setButtonWidth(refButton.current.offsetWidth);
  }, [refButton]);

  useEffect(() => {
    if (!refContent.current) {
      return;
    }

    setContentWidth(refContent.current.offsetWidth);
  }, [refContent]);

  const heightButtons = { height: `${buttonWidth}px` };

  const clickLeft = () => {
    setStep(prevStep => prevStep - 1);
  };

  const clickRight = () => {
    setStep(prevStep => prevStep + 1);
  };

  return (
    <section className="product-slider">
      <h1 className="product-slider__title">{title}</h1>
      <div
        className="product-slider__button product-slider__button--left"
        ref={refButton}
        style={heightButtons}
      >
        <ButtonNav
          onClick={clickLeft}
          direction="left"
          isEnable={canMoveLeft}
        />
      </div>

      <div
        className="product-slider__button product-slider__button--right"
        style={heightButtons}
      >
        <ButtonNav
          onClick={clickRight}
          direction="right"
          isEnable={canMoveRight}
        />
      </div>

      <div className="product-slider__content" ref={refContent}>
        {products.map(product => (
          <div
            className="product-slider__cart"
            style={styleCart}
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
