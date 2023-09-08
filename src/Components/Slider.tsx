import React, { useState } from 'react';
import classNames from 'classnames';
import '../style/main.scss';
import bannerPhones from '../images/banner/banner-phones.png';
import bannerTablets from '../images/banner/banner-tablets.png';
import bannerAccessories from '../images/banner/banner-accessories.png';

const IMAGES = [
  { id: 0, url: bannerPhones },
  { id: 1, url: bannerTablets },
  { id: 2, url: bannerAccessories },
];

export const Slider: React.FC = () => {
  const [currentIndex, setcurrentIndex] = useState(IMAGES[0].id);

  const preperaBanner = IMAGES.filter(img => img.id === currentIndex);

  const previousBanner = () => {
    let upperNumber = currentIndex - 1;

    if (upperNumber < 0) {
      upperNumber = IMAGES.length - 1;
    }

    setcurrentIndex(upperNumber);
  };

  const nextBanner = () => {
    let upperNumber = currentIndex + 1;

    if (upperNumber > IMAGES.length - 1) {
      upperNumber = 0;
    }

    setcurrentIndex(upperNumber);
  };

  return (
    <div className="container--slider" data-cy="cardsContainer">
      <div className="slider">
        <button
          type="button"
          aria-label="Mute volume"
          className="arrow arrow__left"
          onClick={() => previousBanner()}
        />
        <img src={preperaBanner[0].url} alt="Banner" className="slider--img" />
        <button
          type="button"
          aria-label="Mute volume"
          className="arrow arrow__right"
          onClick={() => nextBanner()}
        />

      </div>
      <div className="slider__lower">

        {
          IMAGES.map((img) => (
            <div key={img.id}>
              <button
                type="button"
                aria-label="Mute volume"
                className={classNames('slider__button', {
                  'slider__button--active': currentIndex === img.id,
                })}
                onClick={() => setcurrentIndex(img.id)}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};
