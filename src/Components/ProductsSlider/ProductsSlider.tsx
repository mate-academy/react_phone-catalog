import { ProductGeneral } from '../../types/ProductGeneral';
import { ProductCard } from '../ProductCard';
import './ProductsSlider.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

type Props = {
  title: string;
  products: ProductGeneral[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

  const updateVisibleCardsCount = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setVisibleCardsCount(1);
    } else if (width >= 640 && width < 1200) {
      setVisibleCardsCount(2);
    } else {
      setVisibleCardsCount(4);
    }
  };

  useEffect(() => {
    updateVisibleCardsCount();
    window.addEventListener('resize', updateVisibleCardsCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCardsCount);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, products.length - visibleCardsCount),
    );
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === products.length - visibleCardsCount;

  return (
    <>
      <div className="product-slider">
        <div className="product-slider__header">
          <h1 className="product-slider__header--title">{title}</h1>
          <div className="product-slider__header--buttons">
            <button
              className={classNames('product-slider__header--button', {})}
              onClick={handlePrevClick}
              disabled={isPrevDisabled}
            >
              <div className="product-slider__header--buttons-img--left img" />
            </button>
            <button
              className={classNames('product-slider__header--button', {})}
              onClick={handleNextClick}
              disabled={isNextDisabled}
            >
              <div className="product-slider__header--buttons-img--right img" />
            </button>
          </div>
        </div>

        <div className="product-slider__container">
          {products.map(product => {
            return (
              <div
                className="product-slider__container__item"
                key={product.id}
                style={{
                  transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`,
                }}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
