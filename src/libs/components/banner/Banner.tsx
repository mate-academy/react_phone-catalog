import {
  useCallback, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';

import './styles.scss';

import { Button } from '../button/Button';
import { ButtonViews, IconNames } from '../../enums';
import { slides, useBannerTimer } from './libs';

type Props = {
  className?: string;
};

export const Banner: React.FC<Props> = ({ className }) => {
  const [slideId, setSlideId] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const lastSlideId = slides.length - 1;

  const sliderRef = useRef<HTMLUListElement>(null);

  const incrementSlideId = useCallback(
    (prevId: number) => (prevId + 1 <= lastSlideId ? prevId + 1 : 0),
    [lastSlideId],
  );

  const decrementSlideId = useCallback(
    (prevId: number) => (prevId - 1 >= 0 ? prevId - 1 : lastSlideId),
    [lastSlideId],
  );

  const { startTimer, stopTimer } = useBannerTimer(() => {
    setSlideId((prevSlideId) => incrementSlideId(prevSlideId));
  });

  const handleNext = () => {
    stopTimer();
    setSlideId((prevSlideId) => incrementSlideId(prevSlideId));
    startTimer();
  };

  const handlePrev = () => {
    stopTimer();
    setSlideId((prevSlideId) => decrementSlideId(prevSlideId));
    startTimer();
  };

  const handleSelectSlide = (id: number) => {
    stopTimer();
    setSlideId(id);
    startTimer();
  };

  useEffect(() => {
    const updateSliderState = () => {
      setSlideId(0);

      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();

        setSliderWidth(rect.width);
      }
    };

    updateSliderState();

    window.addEventListener('resize', updateSliderState);

    return () => {
      window.removeEventListener('resize', updateSliderState);
    };
  }, []);

  useLayoutEffect(() => {
    const rect = sliderRef.current?.getBoundingClientRect();

    if (rect) {
      setSliderWidth(rect.width);
    }
  }, [slideId]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  return (
    <section className={classNames(className, 'banner')}>
      <div className="banner__slider" {...swipeHandlers}>
        <Button
          aria-label="Slider control"
          className="banner__controls"
          view={ButtonViews.ICON_BORDER}
          icon={IconNames.ARROW}
          iconOptions={{ rotate: 180 }}
          onClick={handlePrev}
        />

        <ul
          ref={sliderRef}
          className="banner__slides"
          style={{ touchAction: 'pan-y' }}
        >
          {slides.map(slide => (
            <li
              key={slide.id}
              className="banner__slide"
              style={{
                transform: `translateX(-${slideId * sliderWidth}px)`,
              }}
            >
              <Link
                to={slide.link}
                className="banner__link"
              >
                <img
                  className="banner__image"
                  src={slide.image}
                  alt={slide.title}
                />
              </Link>
            </li>
          ))}
        </ul>

        <Button
          aria-label="Slider control"
          className="banner__controls"
          view={ButtonViews.ICON_BORDER}
          icon={IconNames.ARROW}
          onClick={handleNext}
        />
      </div>

      <div className="banner__bullets">
        {slides.map(slide => (
          <Button
            key={slide.id}
            className={classNames('banner__bullet', {
              'banner__bullet--active': slide.id === slideId,
            })}
            onClick={() => handleSelectSlide(slide.id)}
          />
        ))}
      </div>
    </section>
  );
};
