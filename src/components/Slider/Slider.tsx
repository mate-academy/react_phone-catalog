import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

const imagesUrl: string[] = [
  'new/img/banner/banner-phones.png',
  'new/img/banner/banner-tablets.jpg',
  'new/img/banner/banner-accessories.png',
];

const prepareImagesAlt = (url: string) => {
  const lastSlash = url.lastIndexOf('/');

  return url.slice(lastSlash + 1, -4);
};

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerSize, setContainerSize] = useState(
    { width: 1040, height: 400 },
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0
      ? imagesUrl.length - 1
      : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === imagesUrl.length - 1
      ? 0
      : prevIndex + 1));
  };

  const handleCurrentSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(handleNextSlide, 50000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <div className="slider__content">

          <button
            type="button"
            className="slider__button-prev"
            onClick={handlePrevSlide}
          >
            <img
              className="slider__arrow-left"
              src="new/img/icons/arrow-left.svg"
              alt="arrow-left"
            />
          </button>

          <div
            ref={containerRef}
            style={{
              width: containerSize.width,
              height: containerSize.height,
            }}
            className="slider__image-container"
          >
            {imagesUrl.map((url) => (
              <img
                key={url}
                src={url}
                alt={prepareImagesAlt(url)}
                className="slider__image"
                style={{
                  transform: `translateX(${-containerSize.width * currentIndex}px)`,
                  transition: 'transform 1000ms',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="slider__button-next"
            onClick={handleNextSlide}
          >
            <img
              className="slider__arrow-right"
              src="new/img/icons/arrow-right.svg"
              alt="arrow-right"
            />
          </button>
        </div>

        <div className="slider__pagination">
          {imagesUrl.map((url, index) => (
            <button
              type="button"
              key={url}
              aria-label="slider__dot"
              className={cn('slider__dot', {
                'slider__dot--is-active': +index === currentIndex,
              })}
              onClick={() => handleCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
