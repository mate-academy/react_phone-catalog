import classNames from 'classnames';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { getDeviceType } from '../../utils/getDeviceType';
import { getSlidesCoords } from '../../utils/getSlidesCoords';

const banners = [
  { id: 1, img: `${process.env.PUBLIC_URL}/img/banner-phones.png` },
  { id: 2, img: `${process.env.PUBLIC_URL}/img/banner-tablets.png` },
  { id: 3, img: `${process.env.PUBLIC_URL}/img/banner-accessories.png` },
];

type Props = {
  parentClassName?: string;
};

export const Slider: React.FC<Props> = ({ parentClassName }) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const slides = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState(getDeviceType(windowWidth, 490, 1040));
  const [currentX, setCurrentX] = useState(getSlidesCoords(step).first);
  const cooldownRef = useRef(false);

  const handleSwipeRight = useCallback(() => {
    if (slides.current) {
      const newX =
        currentX - step < getSlidesCoords(step).third
          ? getSlidesCoords(step).first
          : currentX - step;

      setCurrentX(newX);
    }
  }, [currentX, step]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!cooldownRef.current) {
        handleSwipeRight();
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [currentX, handleSwipeRight]);

  const handleSwipeLeft = () => {
    if (slides.current) {
      const newX =
        currentX + step > getSlidesCoords(step).first
          ? getSlidesCoords(step).third
          : currentX + step;

      setCurrentX(newX);
    }
  };

  const handleAction = (action: () => void) => {
    if (!cooldownRef.current) {
      action();
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, 5000);
    }
  };

  const handleResize = useCallback(() => {
    setCurrentX(0);
    setWindowWidth(window.innerWidth);
    setStep(getDeviceType(windowWidth, 490, 1040));
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (slides.current) {
      slides.current.style.left = `${currentX}px`;
    }
  }, [currentX]);

  useEffect(() => {
    if (slides.current) {
      slides.current.style.left = `0px`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return (
    <Fragment>
      <div onClick={handleSwipeLeft} className="home-page__slide-wrapper">
        <p className="home-page__slide-left home-page__slide" />
      </div>
      <div className="home-page__wrapper">
        <section
          className={classNames('slider', {
            [`${parentClassName}__slider`]: parentClassName,
          })}
        >
          <article className="slider__slides" ref={slides}>
            {banners.map(banner => (
              <img
                onTouchStart={event =>
                  setTouchStartX(event.changedTouches[0].clientX)
                }
                onTouchEnd={event => {
                  if (touchStartX - event.changedTouches[0].clientX > 5) {
                    handleAction(handleSwipeRight);
                  } else if (
                    touchStartX - event.changedTouches[0].clientX <
                    -5
                  ) {
                    handleAction(handleSwipeLeft);
                  }
                }}
                key={banner.id}
                src={banner.img}
                alt="banner"
                className="slider__slide"
              />
            ))}
          </article>
        </section>
      </div>
      <div onClick={handleSwipeRight} className="home-page__slide-wrapper">
        <p className="home-page__slide-right home-page__slide" />
      </div>
    </Fragment>
  );
};
