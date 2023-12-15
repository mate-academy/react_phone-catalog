import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Slider.scss';

// import phones from '../../images/slider/phones.png';
// import tablets from '../../images/slider/tablets.png';
// import accessories from '../../images/slider/accessories.png';

const SLIDER_ITEMS = [
  { src: '/phones' },
  { src: '/tablets' },
  { src: '/accessories' },
];

const ANIMATION_DURATION = 1500;

export const Slider: React.FC = () => {
  const [firstImage, setFirstImage] = useState(0);

  const lastVisible = SLIDER_ITEMS.length - 1;
  const translateValue = (firstImage) * 100;

  const scrollForward = useCallback(() => {
    setFirstImage(firstImage === lastVisible
      ? 0
      : currentImg => currentImg + 1);
  }, [firstImage, lastVisible]);

  const scrollBack = useCallback(() => {
    setFirstImage(firstImage === 0
      ? lastVisible
      : currentImg => currentImg - 1);
  }, [firstImage, lastVisible]);

  useEffect(() => {
    const interval = setInterval(scrollForward, 5000);

    return () => clearInterval(interval);
  }, [firstImage, scrollForward]);

  return (
    <div className="Slider">
      <div className="Slider__content">
        <div className="Slider__main">
          <button
            type="button"
            aria-label="Previous"
            className="button button--slider button--slider-back"
            onClick={scrollBack}
          />
          <ul className="Slider__list">
            {SLIDER_ITEMS.map((item, i) => (
              <li
                key={item.src}
                style={{
                  transform: `translateX(-${translateValue}%)`,
                  transition: `transform ${ANIMATION_DURATION}ms ease`,
                }}
                className="Slider__list-item"
              >
                <Link
                  to={item.src}
                  className={`Slider__link Slider__link--${i}`}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Next"
            className="button button--slider button--slider-forward"
            onClick={scrollForward}
          />
        </div>

        <div className="Slider__dots">
          {SLIDER_ITEMS.map((item, i) => (
            <div
              key={item.src}
              className={classNames('Slider__dot', {
                'Slider__dot--active': i === firstImage,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
