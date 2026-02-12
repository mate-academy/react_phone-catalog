import './HomeSlider.scss';
import classNames from 'classnames';
import { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { icons } from '../../../../../global-assets/static';
import { TranslationContext } from '../../../../../i18next/shared/TranslationContext';

type HomeSliderProps = {
  content: {
    src: string;
    alt: string;
  }[];
};

export const HomeSlider: React.FC<HomeSliderProps> = ({ content }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { btnsTitle, sliderTitle } = useContext(TranslationContext);

  const ArrowRight = icons.arrowRight.valuePath;
  const ArrowLeft = icons.arrowLeft.valuePath;

  const handleScroll = (currentIndex: number) => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollTo({
      left: currentIndex * containerRef.current.offsetWidth,
      behavior: 'smooth',
    });

    setSlideIndex(currentIndex);
  };

  useEffect(() => {
    if (!autoScroll) {
      return;
    }

    const interval = setInterval(() => {
      setSlideIndex(prev => {
        const nextIndex = (prev + 1) % content.length;

        handleScroll(nextIndex);

        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [content, autoScroll]);

  const onRelease = () => {
    if (slideIndex === 5) {
      setSlideIndex(0);

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => setAutoScroll(true), 2000);

      return;
    }

    if (!containerRef.current) {
      return;
    }

    let closestIndex = 0;
    let minDiff = Infinity;

    const container = containerRef.current;
    const centerOfContainer = container.scrollLeft + container.offsetWidth / 2;

    const imageList = Array.from(container.children) as HTMLElement[];

    imageList.forEach((image, index) => {
      const imageCenter = image.offsetLeft + image.offsetWidth / 2;
      const diff = Math.abs(imageCenter - centerOfContainer);

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setSlideIndex(closestIndex);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setAutoScroll(true), 2000);
  };

  const goToDiscounts = () => {
    const el = document.getElementById('discounts');

    if (el) {
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const moveSliderByButtons = useCallback(
    (direction: 'back' | 'forward' | null, imagePosition?: number) => {
      setAutoScroll(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setAutoScroll(true);
      }, 5000);

      let newSlide = slideIndex;

      if (direction) {
        if (direction === 'forward') {
          newSlide = slideIndex + 1;

          if (newSlide === content.length) {
            newSlide = 0;
          }
        }

        if (direction === 'back') {
          newSlide = slideIndex - 1;

          if (newSlide < 0) {
            newSlide = content.length - 1;
          }
        }
      }

      if (imagePosition !== undefined) {
        newSlide = imagePosition;
      }

      setSlideIndex(newSlide);

      if (!containerRef.current) {
        return;
      }

      containerRef.current.scrollTo({
        left: newSlide * containerRef.current.offsetWidth,
        behavior: 'smooth',
      });
    },

    [slideIndex, content.length],
  );

  return (
    <>
      <div className="slider">
        <div className="slider__container">
          <button
            className="slider__arrow"
            onClick={() => moveSliderByButtons('back')}
          >
            <ArrowLeft className="slider__arrow__icon" />
          </button>
          <div
            className="slider__image-wrapper"
            onMouseUp={onRelease}
            onTouchEnd={onRelease}
            onMouseDown={() => setAutoScroll(false)}
            onTouchStart={() => setAutoScroll(false)}
            ref={containerRef}
          >
            {content.map((contentItem, index) => (
              <div key={index} className="slider__image__container">
                <div className="slider__image__info-wrapper">
                  <span className="slider__image__info-text">
                    {sliderTitle.sliderMain[index]}
                  </span>
                  <button
                    onClick={goToDiscounts}
                    className="slider__image__btn"
                  >
                    {btnsTitle.sliderBtn}
                  </button>
                </div>
                <img
                  className={classNames('slider__image')}
                  src={contentItem.src}
                  alt={contentItem.alt}
                  key={contentItem.src}
                  draggable="false"
                />
              </div>
            ))}
          </div>
          <button className="slider__arrow">
            <ArrowRight
              className="slider__arrow__icon"
              onClick={() => moveSliderByButtons('forward')}
            />
          </button>
        </div>
      </div>

      <div className="slider__buttons">
        {content.map((_, index: number) => (
          <button
            className={classNames('slider__buttons-button', {
              'slider__buttons-button--active': index === slideIndex,
            })}
            key={index}
            onClick={() => moveSliderByButtons(null, index)}
          ></button>
        ))}
      </div>
    </>
  );
};
