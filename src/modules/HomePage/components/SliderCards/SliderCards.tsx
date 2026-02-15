import './SliderCards.scss';
import { useEffect, useState } from 'react';
import { SliderCardsProps } from '../../../../constants/common';
import { ProductCard } from '../../../../components/ProductCard';
import { useSwipe } from '../../../../utils/swipeCallbacks';

export const SliderCards: React.FC<SliderCardsProps> = ({
  products,
  title,
  discountPrice = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slidesPerView =
    windowWidth <= 639
      ? 1.5
      : windowWidth <= 850
        ? 2.5
        : windowWidth <= 1199
          ? 3
          : 4;

  const itemsPerStep = windowWidth <= 639 ? 1 : Math.floor(slidesPerView);
  const maxIndex = Math.max(0, Math.ceil(products.length - slidesPerView));
  const translateX = (currentIndex / slidesPerView) * 100;

  const prevSlide = () => {
    if (currentIndex === 0) {
      setShake(true);
      setTimeout(() => setShake(false), 300);

      return;
    }

    setCurrentIndex(prev => Math.max(prev - itemsPerStep, 0));
  };

  const nextSlide = () => {
    if (currentIndex >= maxIndex) {
      setShake(true);
      setTimeout(() => setShake(false), 300);

      return;
    }

    setCurrentIndex(prev => Math.min(prev + itemsPerStep, maxIndex));
  };

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  });

  return (
    <div className="slider-cards">
      <h2 className="section-title">{title}</h2>
      <div
        className={`slider-cards__box ${shake ? 'shake' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ul
          className="slider-cards__track"
          style={{ transform: `translateX(-${translateX}%)` }}
        >
          {products.map((product, index) => (
            <li className="slider-cards__item" key={index}>
              <ProductCard product={product} discountPrice={discountPrice} />
            </li>
          ))}
        </ul>
      </div>

      <div className="slider-cards__buttons">
        <button
          onClick={prevSlide}
          className={`slider-cards__button slider-cards__button--prev ${
            currentIndex === 0 ? 'slider-cards__button--disabled' : ''
          }`}
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className={`slider-cards__button slider-cards__button--next ${
            currentIndex >= maxIndex ? 'slider-cards__button--disabled' : ''
          }`}
        >
          ❯
        </button>
      </div>
    </div>
  );
};
