import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './ProductSlider.scss';
import { icons } from '../../../constants/icons';
import { ProductCard } from '../ProductCard';
import { Product } from '../../../types/Product';
import { ButtonIcon } from '../ButtonIcon';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxCards, setMaxCards] = useState(4);
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 450) {
      setMaxCards(1.5);
    } else if (screenWidth < 800) {
      setMaxCards(2);
    } else if (screenWidth < 1200) {
      setMaxCards(3);
    } else {
      setMaxCards(4);
    }
  }, []);

  const maxIndex = useMemo(() => {
    return products.length - maxCards;
  }, [products, maxCards]);

  const handleNextButton = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const handlePrevButton = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  return (
    <section className="product-slider">
      <div className="product-slider__top">
        <h2 className="section-title product-slider__title">{title}</h2>
        <div className="product-slider__buttons">
          <ButtonIcon
            icon={icons.arrowLeft}
            iconDisabled={icons.arrowLeftLight}
            isDisabled={currentIndex === 0}
            handleOnClick={handlePrevButton}
          />
          <ButtonIcon
            icon={icons.arrowRight}
            iconDisabled={icons.arrowRightLight}
            isDisabled={currentIndex === maxIndex}
            handleOnClick={handleNextButton}
          />
        </div>
      </div>

      <div className="product-slider__bottom">
        <div
          className="product-slider__track"
          style={{
            transform: `translateX(-${currentIndex * (width + 16)}px)`,
          }}
        >
          {products.map((product, index) => {
            if (index === currentIndex) {
              return (
                <div
                  key={product.itemId}
                  ref={el => {
                    if (!el) {
                      return;
                    }

                    setWidth(el.getBoundingClientRect().width);
                  }}
                  className="product-slider__item"
                >
                  <ProductCard product={product} />
                </div>
              );
            }

            return (
              <div key={product.itemId} className="product-slider__item">
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
