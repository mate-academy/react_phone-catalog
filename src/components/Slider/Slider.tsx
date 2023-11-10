import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Slider.scss';

import phones from '../../images/slider/phones.png';
import tablets from '../../images/slider/tablets.png';
import accessories from '../../images/slider/accessories.png';

const SLIDER_IMAGES = [
  { url: phones, alt: 'phones' },
  { url: tablets, alt: 'tablets' },
  { url: accessories, alt: 'accessories' },
];

const ANIMATION_DURATION = 1500;

type Props = {
  itemWidth: number,
};

export const Slider: React.FC<Props> = ({ itemWidth = 1040 }) => {
  const [firstImage, setFirstImage] = useState(0);

  const lastVisible = SLIDER_IMAGES.length - 1;
  const translateValue = (firstImage) * itemWidth;

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
          <ul
            className="Slider__list"
            style={{ width: itemWidth }}
          >
            {SLIDER_IMAGES.map(image => (
              <li
                key={image.url}
                style={{
                  transform: `translateX(-${translateValue}px)`,
                  transition: `transform ${ANIMATION_DURATION}ms ease`,
                }}
                className="Slider__list-item"
              >
                <Link to={`/${image.alt}`} className="Slider__link">
                  <img
                    src={image.url}
                    alt={image.alt}
                    width={itemWidth}
                    className="Slider__image"
                  />
                </Link>
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
          <button
            type="button"
            aria-label="Previous"
            className="button button--mobile button--prev"
            onClick={scrollBack}
          />
          {SLIDER_IMAGES.map((image, i) => (
            <div
              key={image.url}
              className={classNames('Slider__dot', {
                'Slider__dot--active': i === firstImage,
              })}
            />
          ))}

          <button
            type="button"
            aria-label="Next"
            className="button button--mobile button--next"
            onClick={scrollForward}
          />
        </div>
      </div>
    </div>
  );
};
