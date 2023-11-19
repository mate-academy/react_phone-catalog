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
        <section className="slider-box">
          <div className="slider">
            <button
              type="button"
              className="slider__button previous"
              onClick={handleLeftShift}
            >
              <div className="slider__arrow arrow-left icon" />
            </button>
            <div className={`slider__container item-${selectedBanner}`} />
            <button
              type="button"
              className="slider__button next"
              onClick={handleRightShift}
            >
              <div className="slider__arrow arrow-right icon" />
            </button>
          </div>
          <div className="slider__dots">
            <button
              type="button"
              className={classNames(
                'slider__dot',
                { 'slider__dot--active': selectedBanner === 1 },
              )}
              onClick={() => setSelectedBanner(1)}
            />
            <button
              type="button"
              className={classNames(
                'slider__dot',
                { 'slider__dot--active': selectedBanner === 2 },
              )}
              onClick={() => setSelectedBanner(2)}
            />
            <button
              type="button"
              className={classNames(
                'slider__dot',
                { 'slider__dot--active': selectedBanner === 3 },
              )}
              onClick={() => setSelectedBanner(3)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
