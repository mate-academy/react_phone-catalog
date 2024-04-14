/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import cn from 'classnames';
import './Banner.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ICONS } from '../../images/icons/Icons';

export const Banner = () => {
  const [sliderCount, setSliderCount] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const next = () => {
    setSliderCount(counter => (counter + 1 > 3 ? 1 : counter + 1));
  };

  const previous = () => {
    setSliderCount(counter => (counter - 1 < 1 ? 3 : counter - 1));
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      previous();
    } else if (event.key === 'ArrowRight') {
      next();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderCount(counter => (counter + 1 > 3 ? 1 : counter + 1));
    }, 5000);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) {
      return;
    }

    const touchMoveX = e.touches[0].clientX;
    const diff = touchMoveX - touchStartX.current;

    if (diff > 50) {
      next();
    } else if (diff < -50) {
      previous();
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <section className="banner" aria-label="Image slider">
      <h1 className="banner__title">Welcome to Gadgets store!</h1>
      <div className="banner__content">
        <button
          type="button"
          className="banner--button"
          onClick={previous}
          aria-label="view previous image"
        >
          <img src={ICONS.arrowLeft} alt="arrow left" />
        </button>

        <div
          className="banner--images"
          aria-label="Images of products"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={cn('banner--image banner--image--1', {
              'banner--image--active': sliderCount === 1,
            })}
            aria-label="Iphones 14 in different colors"
          />
          <div
            className={cn('banner--image banner--image--2', {
              'banner--image--active': sliderCount === 2,
            })}
            aria-label="different tablets"
          />
          <div
            className={cn('banner--image banner--image--3', {
              'banner--image--active': sliderCount === 3,
            })}
            aria-label="different watches"
          />
        </div>

        <button
          type="button"
          className="banner--button"
          onClick={next}
          aria-label="view next image"
        >
          <img src={ICONS.arrowRight} alt="arrow right" />
        </button>
      </div>

      <ul className="banner--list">
        <li
          className={cn('banner--item', {
            'banner--item--active': sliderCount === 1,
          })}
          onClick={() => setSliderCount(1)}
          onKeyDown={() => {}}
          aria-label={`View image ${1}`}
        />

        <li
          className={cn('banner--item', {
            'banner--item--active': sliderCount === 2,
          })}
          onClick={() => setSliderCount(2)}
          onKeyDown={() => {}}
          aria-label={`View image ${2}`}
        />

        <li
          className={cn('banner--item', {
            'banner--item--active': sliderCount === 3,
          })}
          onClick={() => setSliderCount(3)}
          onKeyDown={() => {}}
          aria-label={`View image ${3}`}
        />
      </ul>
    </section>
  );
};
