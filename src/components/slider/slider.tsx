import { Product } from '../../types/product';
import { ProductCard } from '../productCard/productCard';
import { useEffect, useRef, useState } from 'react';
import config from '../../utils/config';
import classNames from 'classnames';

type Props = {
  products: Product[];
  title: string;
  showOldPrice: boolean;
};

export const Slider: React.FC<Props> = ({ products, title, showOldPrice }) => {
  const timer = config.transitionTime;
  const [currentTrans, setCurrentTrans] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(0);

  const styles = {
    transform: `translateX(-${currentTrans * cardWidth + (currentTrans || 1 - 1) * 16}px)`,
    transition: `transform ${timer}ms ease-out`,
  };

  const handleNext = () => {
    if (currentTrans === products.length - cardsPerPage) {
      return;
    }

    setCurrentTrans(currentTrans + 1);
  };

  const handlePrev = () => {
    if (currentTrans === 0) {
      return;
    }

    setCurrentTrans(currentTrans - 1);
  };

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setElementWidth(elementRef.current.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 640) {
      const column = (elementWidth - 16 * 3) / 4;

      setCardWidth(column * 3 + 16 * 2);
      setCardsPerPage(1);
    } else if (window.innerWidth < 1200) {
      const column = (elementWidth - 16 * 11) / 12;

      setCardWidth(column * 5 + 16 * 4);
      setCardsPerPage(2);
    } else {
      setCardWidth(272);
      setCardsPerPage(4);
    }
  }, [elementWidth]);

  return (
    <section className="slider" ref={elementRef}>
      <div className="slider__title-buttons">
        <h2 className="slider__title">{title}</h2>
        <div className="slider__buttons">
          <button
            className={classNames('button-slider b-left button-size', {
              'button-slider__disabled b-left-g': currentTrans === 0,
            })}
            onClick={handlePrev}
          ></button>
          <button
            className={classNames('button-slider b-right button-size', {
              'button-slider__disabled b-right-g':
                currentTrans === products.length - cardsPerPage,
            })}
            onClick={handleNext}
          ></button>
        </div>
      </div>
      <div className="slider__container">
        <div className="slider__list" style={styles}>
          {products.map(product => (
            <ProductCard
              showOldPrice={showOldPrice}
              product={product}
              key={product.id}
              style={{ width: `${cardWidth}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
