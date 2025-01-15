import './ProductsSlider.scss';
import classNames from 'classnames';
import React, { useState, useEffect, useContext } from 'react';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import { Icon } from '../Icon';
import { iconsObject } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../store/GlobalContext';

type Props = {
  title: string;
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  displayType,
}) => {
  const { theme } = useContext(GlobalContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(272);
  const gap = 16;
  const totalCardsPerTrack = 4;

  const updateCardWidth = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 640) {
      setCardWidth(212);
    } else if (screenWidth < 1200) {
      setCardWidth(237);
    } else {
      setCardWidth(272);
    }
  };

  useEffect(() => {
    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    return () => {
      window.removeEventListener('resize', updateCardWidth);
    };
  }, []);

  const totalItems = products.length;
  const maxIndex = totalItems - totalCardsPerTrack;

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="productsSlider">
      <div className="productsSlider__container-top">
        <h2 className="productsSlider__title">{title}</h2>
        <div className="productsSlider__buttons">
          <div
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': currentIndex === 0,
            })}
            onClick={handlePrev}
          >
            {currentIndex === 0 ? (
              theme === 'light' ? (
                <Icon icon={iconsObject.arrow_left__disabled} />
              ) : (
                <Icon icon={iconsObject.arrow_left} />
              )
            ) : theme === 'light' ? (
              <Icon icon={iconsObject.arrow_left} />
            ) : (
              <Icon icon={iconsObject.arrow_left__disabled} />
            )}
          </div>
          <div
            className={classNames('productsSlider__button', {
              'productsSlider__button--disabled': currentIndex === maxIndex,
            })}
            onClick={handleNext}
          >
            {currentIndex === maxIndex ? (
              theme === 'light' ? (
                <Icon icon={iconsObject.arrow_right__disabled} />
              ) : (
                <Icon icon={iconsObject.arrow_right_dark__disabled} />
              )
            ) : theme === 'light' ? (
              <Icon icon={iconsObject.arrow_right} />
            ) : (
              <Icon icon={iconsObject.arrow_right__disabled} />
            )}
          </div>
        </div>
      </div>

      <div className="productsSlider__viewport">
        <div
          className="productsSlider__track"
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
          }}
        >
          {products.map(phone => (
            <div
              key={phone.id}
              className="productsSlider__item"
              style={{ width: `${cardWidth}px`, marginRight: `${gap}px` }}
            >
              <ProductCard product={phone} displayType={displayType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
