import React, { useState } from 'react';
import className from 'classnames';
import { Phone } from '../../type/Phone';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = {
  phones: Phone[];
  title: string;
};

export const ProductsSlider: React.FC<Props> = ({
  phones,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;

    if (!isFirstSlide) {
      setCurrentIndex(prevInd => prevInd - 1);
    }
  };

  const goToNext = () => {
    const isFirstSlide = currentIndex === phones.length - 4;

    if (!isFirstSlide) {
      setCurrentIndex(prevInd => prevInd + 1);
    }
  };

  return (
    <section className="productSlider homePage__productSlider">
      <div className="productSlider__wrapper">
        <div className="productSlider__topPart">
          <h1 className="title">{title}</h1>

          <div className="productSlider__actionBlock">
            <button
              type="button"
              className={className(
                'productSlider__button',
                { 'productSlider__button--disabled': currentIndex === 0 },
              )}
              disabled={currentIndex === 0}
              onClick={goToPrevious}
            >
              {currentIndex !== 0
                ? (
                  <img
                    src="./images/icons/ArrowLeft.svg"
                    alt="ArrowLeft"
                    className="icon"
                  />
                )
                : (
                  <img
                    src="./images/icons/ArrowLeftDisabled.svg"
                    alt="ArrowLeft"
                    className="icon"
                  />
                )}
            </button>

            <button
              type="button"
              className={className(
                'productSlider__button',
                {
                  'productSlider__button--disabled':
                    currentIndex === phones.length - 4,
                },
              )}
              disabled={currentIndex === phones.length - 4}
              onClick={goToNext}
            >
              {currentIndex !== phones.length - 4
                ? (
                  <img
                    src="./images/icons/ArrowRight.svg"
                    alt="ArrowRight"
                    className="icon"
                  />
                )
                : (
                  <img
                    src="./images/icons/ArrowRightDisabled.svg"
                    alt="ArrowRight"
                    className="icon"
                  />
                )}
            </button>
          </div>
        </div>

        <div className="productSlider__phoneListWrap">
          <div
            className="productSlider__phoneList"
            style={{
              transform: `translateX(-${currentIndex * 288}px)`,
            }}
          >
            {phones.map(phone => (
              <ProductCard
                phone={phone}
                key={phone.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
