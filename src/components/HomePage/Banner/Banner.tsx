import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { ICONS } from '../../../images/icons/icons';
import './Banner.scss';

export const Banner = () => {
  const [sliderCounter, setSliderCounter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderCounter(counter => (counter + 1 > 3 ? 1 : counter + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSliderCounterNext = () => {
    setSliderCounter(counter => (counter + 1 > 3 ? 1 : counter + 1));
  };

  const handleSliderCounterPrev = () => {
    setSliderCounter(counter => (counter - 1 < 1 ? 3 : counter - 1));
  };

  return (
    <section className="banner">
      <div className="banner__content">
        <button
          type="button"
          onClick={handleSliderCounterPrev}
          className="banner--button"
        >
          <img
            src={ICONS.arrowLeft}
            alt="Arrow left"
          />
        </button>
        <div className="banner--images">
          <div
            className={classNames(
              'banner--image banner--image--1', {
                'banner--image--active': sliderCounter === 1,
              },
            )}
          />
          <div
            className={classNames(
              'banner--image banner--image--2', {
                'banner--image--active': sliderCounter === 2,
              },
            )}
          />
          <div
            className={classNames(
              'banner--image banner--image--3', {
                'banner--image--active': sliderCounter === 3,
              },
            )}
          />
        </div>
        <button
          type="button"
          onClick={handleSliderCounterNext}
          className="banner--button"
        >
          <img
            src={ICONS.arrowRight}
            alt="Arrow right"
          />
        </button>
      </div>
      <ul className="banner--list">
        <li className={classNames(
          'banner--item', {
            'banner--item--active': sliderCounter === 1,
          },
        )}
        />
        <li className={classNames(
          'banner--item', {
            'banner--item--active': sliderCounter === 2,
          },
        )}
        />
        <li className={classNames(
          'banner--item', {
            'banner--item--active': sliderCounter === 3,
          },
        )}
        />
      </ul>
    </section>
  );
};
