import React, { useContext, useState } from 'react';
import NextButtonLight from '../../images/NextButton.svg';
import PrevButtonLight from '../../images/PrevButton.svg';
import NextButtonDark from '../../images/NextButtonDark.svg';
import PrevButtonDark from '../../images/PrevButtonDark.svg';
import './ProductsList.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { themeClass } from '../../utils/themeClass';
import { Product } from '../../types/Product';
import { ProductCardDicount } from '../ProductCardDiscount/productCardDiscount';
import { useSwipe } from '../../utils/useSwipe';

type Props = {
  header: string;
  productsToRender: Product[];
  isDiscount: boolean;
};

export const ProductsList: React.FC<Props> = ({
  header,
  productsToRender,
  isDiscount,
}) => {
  const { light } = useContext(ThemeContext);
  const getClassName = themeClass(light);
  const [translate, setTranslate] = useState(0);
  const step = 304;
  const windowWidth = window.innerWidth;
  let displayedCards: number;

  if (windowWidth >= 1199) {
    displayedCards = 4;
  } else if (windowWidth < 1199 && windowWidth >= 928) {
    displayedCards = 3;
  } else if (windowWidth < 928 && windowWidth > 639) {
    displayedCards = 2;
  } else {
    displayedCards = 1;
  }

  const nextSlide = () => {
    if (translate > -(productsToRender.length - displayedCards) * step) {
      setTranslate(prev => prev - step);
    }
  };

  const prevSlide = () => {
    if (translate < 0) {
      setTranslate(prev => prev + step);
    }
  };

  const { onTouchEnd, onTouchStart, onTouchMove } = useSwipe(
    nextSlide,
    prevSlide,
  );

  return (
    <section className={getClassName('ProductsList')}>
      <h2 className={getClassName('ProductsList__header')}>{header}</h2>

      <button
        disabled={translate === 0}
        onClick={prevSlide}
        className={getClassName('change-button ProductsList__button button1')}
      >
        <img src={light ? PrevButtonLight : PrevButtonDark} alt="" />
      </button>

      <button
        disabled={
          translate === -(productsToRender.length - displayedCards) * step
        }
        onClick={nextSlide}
        className={getClassName('change-button ProductsList__button')}
      >
        <img src={light ? NextButtonLight : NextButtonDark} alt="" />
      </button>

      <div
        className="ProductsList__carousel"
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
      >
        <div
          className="box"
          style={{
            transition: 'all 300ms',
            transform: `translateX(${translate}px)`,
          }}
        >
          {productsToRender.map(product =>
            isDiscount ? (
              <ProductCardDicount product={product} key={product.id} />
            ) : (
              <ProductCard product={product} key={product.id} />
            ),
          )}
        </div>
      </div>
    </section>
  );
};
