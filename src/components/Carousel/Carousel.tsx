import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types';
import './Carousel.scss';
import { Card } from '../Card/Card';

type Props = {
  items: Product[];
  visibleDiscount: boolean;
};

export const Carousel: React.FC<Props> = ({ items, visibleDiscount }) => {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentShift, setCurrentShift] = useState(0);
  const [itemWidth, setItemWidth] = useState(237);
  const [containerWidth, setContainerWidth] = useState(0);
  const visibleItems = containerWidth / (itemWidth + 16);

  const maxShift =
    Math.max(0, (items.length - visibleItems) * (itemWidth + 16)) - 16;

  const updateWidth = () => {
    if (itemRef.current) {
      const { width } = itemRef.current.getBoundingClientRect();

      setItemWidth(width);
    }

    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();

      setContainerWidth(width);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateWidth();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleNext = () => {
    if (currentShift + itemWidth + 16 > maxShift) {
      setCurrentShift(maxShift);

      return;
    }

    setCurrentShift(currentShift + itemWidth + 16);
  };

  const handlePrev = () => {
    if (!itemWidth) {
      return;
    }

    if (currentShift - itemWidth - 16 < 0) {
      setCurrentShift(0);
    } else {
      setCurrentShift(currentShift - itemWidth - 16);
    }
  };

  return (
    <div className="carousel__container" ref={containerRef}>
      <div className="carousel__nav-buttons">
        <button
          className="carousel__nav-button--left icon button"
          onClick={handlePrev}
          disabled={currentShift === 0}
        ></button>
        <button
          className="carousel__nav-button--right icon button"
          onClick={handleNext}
          disabled={currentShift === maxShift}
        ></button>
      </div>
      <div className="carousel__cards">
        <ul
          className="carousel__list"
          style={{
            transition: `transform 300ms ease-in-out`,
            transform: `translateX(-${currentShift}px)`,
          }}
        >
          {items.map((phone: Product) => (
            <li key={phone.id} className="carousel__item">
              <div ref={itemRef}>
                <Card item={phone} discount={visibleDiscount} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
