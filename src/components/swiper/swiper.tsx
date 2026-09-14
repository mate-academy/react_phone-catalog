import React, { useCallback, useEffect, useState } from 'react';
import baner from '../../../public/img/banner-accessories.png';
import baner2 from '../../../public/img/banner-phones.png';
import baner3 from '../../../public/img/banner-tablets.png';
import './swiper.scss';
import classNames from 'classnames';
const images = [baner, baner2, baner3];

export const Slider: React.FC = () => {
  const [image, setImage] = useState(0);

  const handlePageChange = useCallback((count: number) => {
    setImage(currentImage => {
      const newImage = currentImage + count;

      if (newImage >= images.length) {
        return 0;
      }

      if (newImage < 0) {
        return images.length - 1;
      }

      return newImage;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handlePageChange(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [handlePageChange]);

  return (
    <>
      <button
        type="button"
        className="button"
        onClick={() => handlePageChange(-1)}
      >
        {'<'}
      </button>
      <div className="slider">
        <div
          style={{
            transform: `translateX(-${image * 100}%)`,
          }}
          className="slider--track"
        >
          {images.map(items => (
            <img className="slider--img" key={items} src={items} alt="" />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="button"
        onClick={() => handlePageChange(1)}
      >
        {'>'}
      </button>
      <div className="sidebar">
        <button
          onClick={() => setImage(0)}
          className={classNames('sidebar--item', image === 0 && 'is-active')}
        ></button>
        <button
          onClick={() => setImage(1)}
          className={classNames('sidebar--item', image === 1 && 'is-active')}
        ></button>
        <button
          onClick={() => setImage(2)}
          className={classNames('sidebar--item', image === 2 && 'is-active')}
        ></button>
      </div>
    </>
  );
};
