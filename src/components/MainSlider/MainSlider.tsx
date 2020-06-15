import React, { useState, useEffect, useCallback } from 'react';
import './MainSlider.scss';
import cn from 'classnames/bind';

const sliders = [
  {
    id: 1,
    image: './img/slider_img-1.jpg',
  },
  {
    id: 2,
    image: './img/slider_img-2.jpg',
  },
  {
    id: 3,
    image: './img/slider_img-3.jpg',
  },
];

interface SlideCarousel {
  id?: number;
  image?: string;
}

const MainSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translatePrev, setTranslatePrev] = useState(false);
  const [translateNext, setTranslateNext] = useState(false);
  const [selectedDot, setSelectedDot] = useState(0);
  const [nextSlide, setNextSlide] = useState<SlideCarousel>({});
  const [prevSlide, setPrevSlide] = useState<SlideCarousel>({});

  const handlePrevOnClick = useCallback(
    () => {
      setTranslatePrev(true);
      setTimeout(() => {
        if (currentIndex === 0) {
          setCurrentIndex(sliders.length - 1);
          setSelectedDot(sliders.length - 1);
        } else {
          setCurrentIndex(currentIndex - 1);
          setSelectedDot(selectedDot - 1);
        }

        setTranslatePrev(false);
      }, 500);
    }, [currentIndex, selectedDot],
  );


  const handleNextOnClick = useCallback(() => {
    setTranslateNext(true);
    setTimeout(() => {
      if (currentIndex === sliders.length - 1) {
        setCurrentIndex(0);
        setSelectedDot(0);
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelectedDot(selectedDot + 1);
      }

      setTranslateNext(false);
    }, 500);
  }, [currentIndex, selectedDot]);

  useEffect(() => {
    const interval = setInterval(
      () => handleNextOnClick(),
      4000,
    );

    return () => clearInterval(interval);
  }, [handleNextOnClick]);

  useEffect(() => {
    if (currentIndex === 0) {
      setPrevSlide(sliders[sliders.length - 1]);
    } else {
      setPrevSlide(sliders[currentIndex - 1]);
    }

    if (currentIndex === sliders.length - 1) {
      setNextSlide(sliders[0]);
    } else {
      setNextSlide(sliders[currentIndex + 1]);
    }
  }, [currentIndex]);

  const handleDotClick = (indexDot: number) => {
    if (indexDot > currentIndex) {
      setNextSlide(sliders[indexDot]);
      setTranslateNext(true);
    }

    if (indexDot < currentIndex) {
      setPrevSlide(sliders[indexDot]);
      setTranslatePrev(true);
    }

    setTimeout(() => {
      setCurrentIndex(indexDot);
      setTranslateNext(false);
      setTranslatePrev(false);
    }, 500);
  };

  return (
    <div>
      <div className="СontainerMainSlider">
        <button
          type="button"
          className="Сarousel__Button Btn-left"
          aria-label="Disabled text"
          onClick={handlePrevOnClick}
        />

        <div className="Сontainer__Carousel Сarousel">
          <div>
            <>
              <div
                className={cn('Сarousel__List',
                  {
                    'Сarousel__List--animationPrev': translatePrev,
                    'Сarousel__List--animationNext': translateNext,
                  })}
              >
                <img src={prevSlide.image} alt="photos" />
                <img src={sliders[currentIndex].image} alt="photos" />
                <img src={nextSlide.image} alt="photos" />
              </div>
            </>
          </div>
        </div>
        <button
          type="button"
          aria-label="Disabled text"
          className="Сarousel__Button Btn-right"
          onClick={handleNextOnClick}
        />
      </div>

      <ul className="Сarousel__Dots-wrap">
        {sliders.map((item, index) => {
          return (
            <button
              type="button"
              key={item.id}
              className={cn('Сarousel__Dot',
                { 'Сarousel__Dot--active': index === currentIndex })}
              onClick={() => handleDotClick(index)}
              aria-label="Disabled text"
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MainSlider;
