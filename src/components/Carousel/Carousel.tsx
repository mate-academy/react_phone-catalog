/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import './Carousel.scss';
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import { images } from './images';

type Props = {
  children: JSX.Element[];
  infinite: boolean;
  autoplay: boolean;
  autoflow: number;
  dots: boolean;
};

export const Carousel: React.FC<Props> = ({
  children,
  infinite,
  autoplay,
  autoflow,
  dots,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStarX] = useState<number>(0);
  const [transLeftOffset, setTransLeftOffset] = useState<number>(0);
  const cRef = React.createRef<HTMLDivElement>();
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const stopSliderTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const startSliderTimer = () => {
    stopSliderTimer();

    if (autoplay) {
      slideInterval.current = setInterval(() => {
        setCurrentIndex(currentIndex + 1);
      }, autoflow);
    }
  };

  useLayoutEffect(() => {
    if (autoplay) {
      startSliderTimer();
    }

    return () => stopSliderTimer();
  }, [autoplay, setCurrentIndex, currentIndex]);

  const getStaticIndex = React.useCallback(
    (loopIndex) => {
      let rest = loopIndex % length;

      if (rest < 0) {
        rest += length;
      }

      return rest;
    },
    [length],
  );

  const getNearestLoopIndex = React.useCallback(
    (staticIndex) => {
      const currentStaticIndex = getStaticIndex(currentIndex);
      const diff = staticIndex - currentStaticIndex;

      return currentIndex + diff;
    },
    [currentIndex, getStaticIndex],
  );

  const next = () => {
    if (infinite || currentIndex < (length - 1)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (infinite || currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  const giveMeIntValOf = (el: string) => {
    return parseInt(el.replace('translateX(', '').replace('px)', ''), 10);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const carousel = cRef.current;

    if (carousel === null) {
      return;
    }

    carousel.classList.add('Carousel__contentWrapper--active');

    const carouselContent = (carousel.firstChild as HTMLDivElement);

    e.persist();

    const start = (e.pageX - carousel.offsetLeft);

    const transLeftOff = giveMeIntValOf(carouselContent.style.transform);

    const x = e.pageX - carousel.offsetLeft;
    const walk = x - start || 0;

    carouselContent.style.cssText = `
      transform: translateX(${transLeftOff + walk}px);
      transition: transform 0.0s ease-in-out;
    `;

    setIsDown(true);
    setStarX(start);
    setTransLeftOffset(transLeftOff);
  };

  const handleSnap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const carousel = cRef.current;

    if (carousel === null) {
      return;
    }

    const carouselContent = (carousel.firstChild as HTMLDivElement);

    carouselContent.style.cssText = `
      transition: transform 0.7s cubic-bezier(.25,.72,.51,.96);
      transform: translateX(${-currentIndex * 1056}px);
    `;

    setIsDown(false);

    carousel.classList.remove('Carousel__contentWrapper--active');

    const x = e.pageX - carousel.offsetLeft;
    const walk = x - startX;

    if (walk < -45) {
      next();
    }

    if (walk > 45) {
      prev();
    }
  };

  const handleMouseLeave
  = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDown) {
      return;
    }

    handleSnap(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleSnap(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!isDown) {
      return;
    }

    const carousel = cRef.current;

    if (carousel === null) {
      return;
    }

    const carouselContent = (carousel.firstChild as HTMLDivElement);

    const x = e.pageX - carousel.offsetLeft;
    const walk = x - startX;

    carouselContent.style.transform = `translateX(${transLeftOffset + walk}px)`;
  };

  return (
    <div className="Carousel__container">
      <div className="Carousel__inner">
        <button
          type="button"
          className="Carousel__button button Carousel__button--left"
          onClick={prev}
        >
          &nbsp;
        </button>
        <div
          className="Carousel__wrapper"
        >
          <div
            className="Carousel__contentWrapper"
            style={{
              transform: `translateX(${infinite ? currentIndex * 1056 - 1056 * length : 0}px)`,
            }}
            ref={cRef}
            onMouseDown={(e) => {
              handleMouseDown(e);
            }}
            onMouseUp={(e) => {
              handleMouseUp(e);
            }}
            onMouseLeave={(e) => {
              handleMouseLeave(e);
            }}
            onMouseMove={(e) => {
              handleMouseMove(e);
            }}
          >
            <div
              className="Carousel__content"
              style={{
                transform: `translateX(${-currentIndex * 1056}px)`,
              }}
              onMouseEnter={() => autoplay && stopSliderTimer()}
              onMouseOut={() => autoplay && startSliderTimer()}
              onBlur={() => autoplay && startSliderTimer()}
            >
              {infinite ? (
                Array(length * 2 + 1)
                  .fill(1)
                  .map((_, index) => {
                    const loopIndexToShow: number
                      = currentIndex + index - length;

                    return {
                      staticIndex: getStaticIndex(loopIndexToShow),
                      loopIndexToShow,
                    };
                  })
                  .map(({ staticIndex, loopIndexToShow }) => (
                    <div
                      key={loopIndexToShow}
                    >
                      {children[staticIndex]}
                    </div>
                  ))
              ) : (
                children
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="Carousel__button button Carousel__button--right"
          onClick={next}
        >
          &nbsp;
        </button>
      </div>
      {dots && (
        <div className="Carousel__controls">
          {images.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={classNames(
                'Carousel__control',
                {
                  'Carousel__control--active':
                  getStaticIndex(currentIndex) === index,
                },
              )}
              onClick={() => setCurrentIndex(getNearestLoopIndex(index))}
            >
              &nbsp;
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
