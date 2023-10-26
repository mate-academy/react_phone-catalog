/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

const bannerImages = [
  'img/banner/banner1.jpg',
  'img/banner/banner2.jpg',
  'img/banner/banner3.jpg',
];

export const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesCount = bannerImages.length;
  const dots = Array.from(Array(imagesCount)).map((_, i) => i);

  const updateActiveIndex = (newIndex: number) => {
    let index = newIndex;

    if (index < 0) {
      index = imagesCount - 1;
    } else if (index > imagesCount - 1) {
      index = 0;
    }

    setActiveIndex(index);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateActiveIndex(activeIndex + 1);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeIndex]);

  return (
    <div className="banner">
      <div className="banner__slider">
        <button
          type="button"
          className="banner__button banner__button--prev"
          onClick={() => updateActiveIndex(activeIndex - 1)}
        />
        <div className="banner__image">
          <img
            src={bannerImages[activeIndex]}
            alt="phones"
          />
        </div>
        <button
          type="button"
          className="banner__button banner__button--next"
          onClick={() => updateActiveIndex(activeIndex + 1)}
        />
      </div>
      <div className="banner__dots">
        {dots.map(dot => (
          <button
            key={dot}
            type="button"
            className={classNames(
              'banner__dot',
              { 'banner__dot--active': dot === activeIndex },
            )}
            onClick={() => setActiveIndex(dot)}
          />
        ))}
      </div>
    </div>
  );
};
