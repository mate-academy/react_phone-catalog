import { FC, useState, useRef } from 'react';
import './ProductsSlider.scss';

type Props = {
  title: string,
};

export const ProductsSlider: FC<Props> = ({ title, children }) => {
  const blockProducts = useRef<HTMLDivElement | null>(null);
  const [moveTo, setMoveTo] = useState(0);

  const widthWindow = window.innerWidth;
  const widthProduct = 272;
  const productsInSlider = Math.floor(widthWindow / widthProduct) > 4
    ? 4
    : Math.floor(widthWindow / widthProduct);
  const gap = widthWindow >= 1136
    ? 16
    : (widthWindow - productsInSlider * widthProduct) / (productsInSlider - 1);
  const widthByMove = widthWindow >= 1136 ? 1136 + gap : widthWindow + gap;
  const amountProducts = blockProducts.current?.childNodes.length || 0;
  const maxWidthBlockProducts = amountProducts * widthProduct
  + gap * amountProducts - 1;

  const hendlerNext = () => {
    const moveMax = amountProducts * widthProduct + gap * amountProducts
    - 1 - widthByMove + 1;

    setMoveTo(prevState => {
      if (prevState + widthByMove * 2 >= maxWidthBlockProducts) {
        return moveMax;
      }

      return prevState + widthByMove;
    });
  };

  const hendlerPrev = () => {
    setMoveTo(prevState => {
      if (prevState - widthByMove <= 0) {
        return 0;
      }

      return prevState - widthByMove;
    });
  };

  const style = {
    transform: `translate(-${moveTo}px, 0)`,
    gap: `${gap}px`,
  };

  return (
    <div className="sliderProduct">
      <div className="sliderProduct__header">
        <h1>{title}</h1>
        <div className="sliderProduct__buttons">
          {/* eslint-disable-next-line */}
          <button
            type="button"
            onClick={hendlerPrev}
            className="sliderProduct__button sliderProduct__button--prev"
          />
          {/* eslint-disable-next-line */}
          <button
            type="button"
            onClick={hendlerNext}
            className="sliderProduct__button sliderProduct__button--next"
          />
        </div>
      </div>
      <div className="sliderProduct__container">
        <div
          style={style}
          className="sliderProduct__imageBlock"
          ref={blockProducts}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
