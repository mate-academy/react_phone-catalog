import React, { useEffect, useRef, useState } from 'react';
import styles from './ProductSlider.module.scss';
import '../../styles/App.scss';
import ProductCard from '../ProductCard';
import ArrowButton from '../ArrowButton';
import SecondaryTitle from '../SecondaryTitle';
import { Product } from '../../types/products';

interface ProductSliderProps {
  title: string;
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ title, products }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [cards, setCards] = useState<HTMLDivElement[]>([]);
  const [disablePrev, setDisablePrev] = useState<boolean>(true);
  const [disableNext, setDisableNext] = useState<boolean>(false);

  useEffect(() => {
    if (sliderRef.current) {
      setCards(Array.from(sliderRef.current.children) as HTMLDivElement[]);
    }
  }, []);

  const card = cards[0];

  useEffect(() => {
    if (card) {
      setCardWidth(card.offsetWidth);
    }
  }, [card]);

  function handleNextCard() {
    if (sliderRef.current && cardWidth > 0) {
      const currentScroll = sliderRef.current.scrollLeft;
      const maxScroll =
        sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
      const scrollWidth = cardWidth + 16;

      sliderRef.current.scrollBy({
        left: scrollWidth,
        behavior: 'smooth',
      });

      if (currentScroll + scrollWidth >= maxScroll) {
        setDisableNext(true);
      }

      setDisablePrev(false);
    }
  }

  function handlePrevCard() {
    if (sliderRef.current && cardWidth > 0) {
      const currentScroll = sliderRef.current.scrollLeft;
      const scrollWidth = cardWidth + 16;

      sliderRef.current.scrollBy({
        left: -scrollWidth,
        behavior: 'smooth',
      });

      if (currentScroll - scrollWidth <= 0) {
        setDisablePrev(true);
      }

      setDisableNext(false);
    }
  }

  return (
    <section className={`${styles['product-slider']}`}>
      <div className={`${styles['product-slider__top']} page__wrapper-center`}>
        <SecondaryTitle>{title}</SecondaryTitle>
        <div className={`${styles['product-slider__buttons']}`}>
          <ArrowButton onHandlePage={handlePrevCard} disabled={disablePrev}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z"
                fill="currentColor"
              />
            </svg>
          </ArrowButton>
          <ArrowButton onHandlePage={handleNextCard} disabled={disableNext}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z"
                fill="currentColor"
              />
            </svg>
          </ArrowButton>
        </div>
      </div>
      <div className="page__product-slider-bottom">
        <div className={`${styles['product-slider__bottom']}`} ref={sliderRef}>
          {products.map(product => (
            <ProductCard key={product.itemId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
