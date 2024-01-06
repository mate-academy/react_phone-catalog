/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import './slider.scss';
import classNames from 'classnames';

export const Slider = () => {
  const [selectedBanner, setSelectedBanner] = useState(1);

  const changeSlide = (direction = 1) => {
    let curSlide = selectedBanner;

    if (direction > 0 && (direction + selectedBanner) <= 3) {
      curSlide += 1;
    } else if (direction < 0 && direction + selectedBanner >= 1) {
      curSlide -= 1;
    } else if (direction > 0 && direction + selectedBanner > 3) {
      curSlide = 1;
    } else if (direction < 0 && direction + selectedBanner < 1) {
      curSlide = 3;
    }

    setSelectedBanner(curSlide);
  };

  const goToSlide = (number: number) => {
    setSelectedBanner(number);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide();
    }, 5000);

    return (() => {
      clearInterval(interval);
    });
  }, [selectedBanner]);

  return (
    <section className="slider">
      <div className="slider__field">
        <button
          className="slider__button prev"
          type="button"
          onClick={() => changeSlide(-1)}
        />
        <div className={`slider__poster poster--${selectedBanner}`} />
        <button
          className="slider__button next"
          type="button"
          onClick={() => changeSlide(1)}
        />
      </div>
      <div className="slider__dots">
        <button
          type="button"
          className={classNames(
            'slider__dot',
            { 'slider__dot--active': selectedBanner === 1 },
          )}
          onClick={() => goToSlide(1)}
        />
        <button
          type="button"
          className={classNames(
            'slider__dot',
            { 'slider__dot--active': selectedBanner === 2 },
          )}
          onClick={() => goToSlide(2)}
        />
        <button
          type="button"
          className={classNames(
            'slider__dot',
            { 'slider__dot--active': selectedBanner === 3 },
          )}
          onClick={() => goToSlide(3)}
        />
      </div>
    </section>
  );
};
