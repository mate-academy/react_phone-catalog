/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';

export const Home = () => {
  const [selectedBanner, setSelectedBanner] = useState(1);

  const handleLeftShift = () => {
    let value = selectedBanner;

    if (value > 1) {
      value -= 1;
    } else {
      value = 3;
    }

    setSelectedBanner(value);
  };

  const handleRightShift = () => {
    let value = selectedBanner;

    if (value < 3) {
      value += 1;
    } else {
      value = 1;
    }

    setSelectedBanner(value);
  };

  return (
    <div className="home-page">
      <div className="container">
        <section className="slider-section">
          <div className="slider-box">
            <button
              type="button"
              className="slider__button slider-box__button previous"
              onClick={handleLeftShift}
            >
              <div className="slider__arrow arrow-left icon" />
            </button>
            <div className={`slider-box__container item-${selectedBanner}`} />
            <button
              type="button"
              className="slider__button slider-box__button next"
              onClick={handleRightShift}
            >
              <div className="slider__arrow arrow-right icon" />
            </button>
          </div>
          <div className="slider-box__dots">
            <button
              type="button"
              className={classNames(
                'slider-box__dot',
                { 'slider-box__dot--active': selectedBanner === 1 },
              )}
              onClick={() => setSelectedBanner(1)}
            />
            <button
              type="button"
              className={classNames(
                'slider-box__dot',
                { 'slider-box__dot--active': selectedBanner === 2 },
              )}
              onClick={() => setSelectedBanner(2)}
            />
            <button
              type="button"
              className={classNames(
                'slider-box__dot',
                { 'slider-box__dot--active': selectedBanner === 3 },
              )}
              onClick={() => setSelectedBanner(3)}
            />
          </div>
        </section>
        <section className="hot-price__section">
          <div className="hot-price__section-top">
            <h1 className="section__title">Hot prices</h1>
            <div className="hot-price__slider-buttons">
              <button
                type="button"
                className="slider__button"
              >
                <div className="slider__arrow arrow-left icon" />
              </button>
              <button
                type="button"
                className="slider__button"
              >
                <div className="slider__arrow arrow-right icon" />
              </button>
            </div>
          </div>
          <div className="hot-price__slider">
            <div className="hot-price__item item__card">
              <img
                src=""
                alt="item-name"
                className="item__image"
              />
              <div className="card__content">
                <p
                  className="item__title"
                >
                  Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
                </p>
                <div className="item__prices">
                  <div className="new-price">$799</div>
                  <div className="old-price text-strike">$899</div>
                </div>
                <div className="item__descriptions">
                  <div className="screen-size descriptions__flex-box">
                    <p className="description--title">Screen</p>
                    <p className="description--value">5.8” OLED</p>
                  </div>
                  <div className="capacity descriptions__flex-box">
                    <p className="description--title">Capacity</p>
                    <p className="description--value">64 GB</p>
                  </div>
                  <div className="memory descriptions__flex-box">
                    <p className="description--title">RAM</p>
                    <p className="description--value">4 GB</p>
                  </div>
                </div>
                <div className="item__ations">
                  <button
                    type="button"
                    className="add-to-card"
                  >
                    Add to cart
                  </button>
                  <button type="button" className="add-to-favourite" />
                </div>
              </div>
            </div>
            <div className="item__card">
              hot item 2
            </div>
            <div className="item__card">
              hot item 3
            </div>
            <div className="item__card">
              hot item 4
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
