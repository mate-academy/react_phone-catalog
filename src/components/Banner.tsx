import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export const Banner: FC = () => {
  let itemWidth: number;
  const images = [
    {
      id: 1,
      url: './img/banner-phones.png',
      alt: 'Phones',
    },
    {
      id: 2,
      url: './img/banner-tablets.png',
      alt: 'Tablets',
    },
    {
      id: 3,
      url: './img/banner-accessories.png',
      alt: 'Accessories',
    },
  ];

  const imgsForRender = [
    { ...images[images.length - 1], id: 0 },
    ...images,
    { ...images[0], id: images.length + 1 },
  ];

  const { width = 0, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 300,
  });

  if (width < 560) {
    itemWidth = 252;
  } else if (width < 848) {
    itemWidth = 496;
  } else if (width < 1136) {
    itemWidth = 772;
  } else {
    itemWidth = 1040;
  }

  const animationDuration = 1000;
  const [currentSlide, setCurrentSlide] = useState(1);
  const [currentDuration, setCurrentDuration] = useState(animationDuration);

  const handlerPreviousButton = () => {
    if (currentSlide === 1) {
      setCurrentDuration(0);
      setCurrentSlide(imgsForRender.length - 1);

      return;
    }

    setCurrentSlide(currentSlide - 1);
  };

  const handlerNextButton = () => {
    if (currentSlide === images.length) {
      setCurrentDuration(0);
      setCurrentSlide(0);

      return;
    }

    setCurrentSlide(currentSlide + 1);
  };

  const handlerDotClick = (dotId: number) => () => {
    if (!currentDuration) {
      setCurrentDuration(animationDuration);
    }

    setCurrentSlide(dotId);
  };

  useEffect(() => {
    if (!currentDuration) {
      setCurrentDuration(animationDuration);
      if (currentSlide === 0) {
        setCurrentSlide(currentSlide + 1);

        return;
      }

      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const timerId = setTimeout(handlerNextButton, 5000);

    return () => clearTimeout(timerId);
  }, [currentSlide]);

  return (
    <div className="banner" ref={ref}>
      <div className="banner__slider">
        <button
          className="banner__button button button--banner"
          type="button"
          aria-label="Slide control left"
          onClick={handlerPreviousButton}
        >
          <span className="icon icon--left" />
        </button>
        <div className="banner__imgs-wrapper">
          <div
            className="banner__imgs-container"
            style={{
              transition: `margin-left ${currentDuration}ms`,
              marginLeft: `${-itemWidth * currentSlide}px`,
            }}
          >
            {imgsForRender.map(item => (
              <img
                src={item.url}
                alt={item.alt}
                className="banner__img"
                key={item.id}
                style={{ width: `${itemWidth}px` }}
              />
            ))}
          </div>
        </div>
        <button
          className="banner__button  button button--banner"
          type="button"
          aria-label="Slide control right"
          onClick={handlerNextButton}
        >
          <span className="icon icon--right" />
        </button>
      </div>
      <div className="banner__slides-dots">
        {
          images.map(item => (
            <button
              key={item.id}
              type="button"
              aria-label="Slide control dot"
              className={classNames(
                'banner__slide-dot',
                { 'banner__slide-dot--selected': item.id === currentSlide },
              )}
              onClick={handlerDotClick(item.id)}
            />
          ))
        }
      </div>
    </div>
  );
};
