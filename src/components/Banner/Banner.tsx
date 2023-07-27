/* eslint-disable jsx-a11y/control-has-associated-label */
import './Banner.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const Banner = () => {
  const [position, setPosition] = useState(0);
  const bannerImgs = [
    '/_new/img/banner-phones.png',
    '/_new/img/banner-accessories.png',
    '/_new/img/banner-tablets.png',
  ];

  const imgWidth = 1040;
  const maxPosition = -imgWidth * (bannerImgs.length - 1);

  const clickNext = () => {
    const newPosition = position - imgWidth;

    if (position === maxPosition) {
      setPosition(0);
    } else {
      setPosition(newPosition);
    }
  };

  const clickPrev = () => {
    const newPosition = position + imgWidth;

    if (position === 0) {
      setPosition(maxPosition);
    } else {
      setPosition(newPosition);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setPosition(-imgWidth * index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      clickNext();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [position]);

  return (
    <div className="banner banner--margin">
      <button
        className="banner__button banner__button--left"
        type="button"
        onClick={clickPrev}
      />

      <div className="banner__caroucel">
        <ul
          className="banner__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: 'transform 0.5s',
            width: imgWidth * bannerImgs.length,
          }}
        >
          {bannerImgs.map((img, index) => (
            <li
              key={img}
            >
              <img
                className="banner__img"
                width={imgWidth}
                src={img}
                alt={`banner ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="banner__button banner__button--right"
        type="button"
        onClick={clickNext}
      />

      <div className="banner__indicators">
        {bannerImgs.map((img, index) => (
          <button
            key={img}
            type="button"
            className={classNames('banner__indicator', {
              'banner__indicator--active': position === -imgWidth * index,
            })}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};
