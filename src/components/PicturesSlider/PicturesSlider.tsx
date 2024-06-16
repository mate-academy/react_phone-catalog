import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './PicturesSlider.scss';

type Props = {
  darkTheme: boolean;
};

export const PicturesSlider: React.FC<Props> = ({ darkTheme }) => {
  const [next, setNext] = useState(0);
  const [isPrevButtonDisabled, setisPrevButtonDisabled] = useState(true);

  useEffect(() => {
    if (next === 0) {
      setisPrevButtonDisabled(true);
    }

    if (next < 0) {
      setisPrevButtonDisabled(false);
    }
  }, [next]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (next === 0) {
        setNext(-1);

        return;
      }

      if (next === -1) {
        setNext(-2);

        return;
      }

      if (next === -2) {
        setNext(0);

        return;
      }
    }, 5000);

    return () => {
      clearInterval(timerId);
    };
  }, [next]);

  const handleNextButton = () => {
    if (next === -2) {
      setNext(0);

      return;
    }

    setNext(currentNext => currentNext - 1);
  };

  return (
    <section className="welcome">
      <h2 className="welcome__title title title--big">
        Welcome to Nice Gadgets store!
      </h2>
      <div className="welcome__container">
        <div className="welcome__pictures-slider pictures-slider">
          <ul
            className="pictures-slider__list"
            style={{
              transform: `translateX(${next * 100}%)`,
            }}
          >
            <li className="pictures-slider__slide slide">
              <div className="slide__image slide__image--1"></div>
              <div className="slide__image-tablet">
                <img
                  src="./images/pictures-slider/slide-1-desktop.png"
                  alt="Image"
                />
              </div>
            </li>
            <li className="pictures-slider__slide slide">
              <div className="slide__image slide__image--2"></div>
              <div className="slide__image-tablet">
                <img src="./images/pictures-slider/slide-2.webp" alt="Image" />
              </div>
            </li>
            <li className="pictures-slider__slide slide">
              <div className="slide__image slide__image--3"></div>
              <div className="slide__image-tablet">
                <img src="./images/pictures-slider/slide-3.jpg" alt="Image" />
              </div>
            </li>
          </ul>

          <button
            className={cn(
              // eslint-disable-next-line max-len
              'pictures-slider__button pictures-slider__button--prev button icon-arrow-left',
              {
                'button--disabled': isPrevButtonDisabled,
                'button--dark-theme-disabled':
                  isPrevButtonDisabled && darkTheme,
                'button--dark-theme': darkTheme,
              },
            )}
            onClick={() => {
              setNext(currentNext => currentNext + 1);
            }}
            disabled={isPrevButtonDisabled}
          ></button>

          <button
            className={cn(
              // eslint-disable-next-line max-len
              'pictures-slider__button button pictures-slider__button--next icon-arrow-right',
              {
                'button--dark-theme': darkTheme,
              },
            )}
            onClick={handleNextButton}
          ></button>
        </div>
      </div>

      <div className="pictures-slider__nav">
        <button
          className={cn('dash-button dash-button--1', {
            'dash-button--active': next === 0,
          })}
          onClick={() => setNext(0)}
        ></button>

        <button
          className={cn('dash-button dash-button--2', {
            'dash-button--active': next === -1,
          })}
          onClick={() => {
            setNext(-1);
          }}
        ></button>

        <button
          className={cn('dash-button dash-button--3', {
            'dash-button--active': next === -2,
          })}
          onClick={() => {
            setNext(-2);
          }}
        ></button>
      </div>
    </section>
  );
};
