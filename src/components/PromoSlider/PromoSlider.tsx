import React, { useEffect, useState } from 'react';
import './PromoSlider.scss';
import classNames from 'classnames';
import { ButtonNav } from '../ButtonNav';
// import classNames from 'classnames';

type Props = {};

const SLIDER_CONTENT_IMG = [
  { path: './api/img/banner-phones.png', id: 1 },
  { path: './api/img/banner-accessories.png', id: 2 },
  { path: './api/img/banner-tablets.png', id: 3 },
];

export const PromoSlider: React.FC<Props> = () => {
  const [currentPhotoId, setCurrentPhotoId] = useState(1);
  const [intervalStand, setIntervalStand] = useState<number>();
  const countImg = SLIDER_CONTENT_IMG.length;

  const move = (currentPhotoId - 1) * 100;

  const styleLi = {
    transition: `300ms`,
    transform: `translateX(-${move}%)`,
  };

  const moveLeft = () => {
    setCurrentPhotoId(prevId => {
      if (prevId === 1) {
        return countImg;
      }

      return prevId - 1;
    });
  };

  const moveRight = () => {
    setCurrentPhotoId(prevId => {
      if (prevId === countImg) {
        return 1;
      }

      return prevId + 1;
    });
  };

  const setIntervalChangeSlide = () => {
    const newIntervalStand = window.setInterval(() => {
      moveRight();
    }, 3000);

    setIntervalStand(newIntervalStand);
  };

  const clickLeft = () => {
    window.clearInterval(intervalStand);
    moveLeft();
    setIntervalChangeSlide();
  };

  const clickRight = () => {
    window.clearInterval(intervalStand);
    moveRight();
    setIntervalChangeSlide();
  };

  const changeChecked = (id: number) => {
    window.clearInterval(intervalStand);
    setCurrentPhotoId(id);
    setIntervalChangeSlide();
  };

  useEffect(() => {
    setIntervalChangeSlide();

    return () => {
      window.clearInterval(intervalStand);
    };
  }, []); // eslint-disable-line

  return (
    <section className="promo-slider">
      <div className="promo-slider__container">
        <div className="promo-slider__button-left">
          <ButtonNav onClick={clickLeft} direction="left" />
        </div>

        <div className="promo-slider__button-right">
          <ButtonNav onClick={clickRight} direction="right" />
        </div>

        <div className="promo-slider__content-content">
          <ul className="promo-slider__content-list">
            {SLIDER_CONTENT_IMG.map(img => (
              <li
                className="promo-slider__content-item"
                style={styleLi}
                key={img.id}
              >
                <img
                  src={img.path}
                  alt="promo-img"
                  className="promo-slider__img"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="promo-slider__navigation">
          {SLIDER_CONTENT_IMG.map(img => (
            <div key={img.id} className="promo-slider__navigation-container">
              <input
                type="radio"
                className="promo-slider__radio"
                name="promo-slider__radio"
                id={`promo-slider__radio-${img.id}`}
                checked={currentPhotoId === img.id}
                onChange={() => changeChecked(img.id)}
              />

              <label
                htmlFor={`promo-slider__radio-${img.id}`}
                className="promo-slider__radio-label"
              >
                {/* eslint-disable-next-line */}
                <div
                  className={classNames('promo-slider__radio-button', {
                    'promo-slider__radio-button--active':
                      currentPhotoId === img.id,
                  })}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
