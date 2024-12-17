import React, { useRef, useState } from 'react';
import './BrandList.scss';
import { BrandCard } from '../BrandCard/BrandCard';

export const BrandList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swipeStartX, setSwipeStartX] = useState(0); // Додаємо state для збереження початкової позиції свайпу
  const cards = Array.from({ length: 10 }); // Масив карток для генерації

  // Функція для зміни слайду назад
  const handlePrevSlide = () => {
    setCurrentSlide(current => {
      const prevSlide = current === 0 ? cards.length - 1 : current - 1;

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: prevSlide * containerRef.current.offsetWidth,
          behavior: 'smooth',
        });
      }

      return prevSlide;
    });
  };

  // Функція для зміни слайду вперед
  const handleNextSlide = () => {
    setCurrentSlide(current => {
      const nextSlide = current === cards.length - 1 ? 0 : current + 1;

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: nextSlide * containerRef.current.offsetWidth,
          behavior: 'smooth',
        });
      }

      return nextSlide;
    });
  };

  // Обробка свайпу
  const handleSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const swipeEndX = event.changedTouches[0].clientX;

    if (swipeEndX - swipeStartX > 100) {
      handlePrevSlide();
    } else if (swipeStartX - swipeEndX > 100) {
      handleNextSlide();
    }

    setSwipeStartX(0); // Скидаємо початкову позицію після обробки свайпу
  };

  return (
    <div className="brand-list">
      <div className="container">
        <div className="brand-list__header">
          <h2 className="brand-list__title">Brand new models</h2>
          <div className="brand-list__buttons">
            <button
              className={`brand-list__button-prev ${currentSlide === 0 ? 'disabled' : ''}`}
              onClick={handlePrevSlide}
            >
              &#8249;
            </button>
            <button
              className={`brand-list__button-next ${currentSlide === cards.length - 1 ? 'disabled' : ''}`}
              onClick={handleNextSlide}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>

      <div className="brand-list__wrapper">
        <div
          className="brand-list__container"
          ref={containerRef}
          onTouchStart={event =>
            setSwipeStartX(event.changedTouches[0].clientX)
          } // Збереження початкової позиції свайпу
          onTouchEnd={handleSwipe} // Обробка завершення свайпу
          style={{ display: 'flex', overflowX: 'scroll' }}
        >
          {/* Генерація карток */}
          {cards.map((_, index) => (
            <div key={index} style={{ flexShrink: 0 }}>
              <BrandCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
