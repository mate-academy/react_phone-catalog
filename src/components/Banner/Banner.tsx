import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { bannerImagesApi } from '../../utils/bannerImagesApi';
import './style.scss';

export const Banner = () => {
  const [images, setImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setImages(bannerImagesApi);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setActiveIndex(currIndex => {
        if (currIndex === images.length - 1) {
          return 0;
        }

        return currIndex + 1;
      });
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  const handleIndexUpdate = (newIndex: number) => {
    let updatedIndex = newIndex;

    if (newIndex < 0) {
      updatedIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      updatedIndex = 0;
    }

    setActiveIndex(updatedIndex);
  };

  return (
    <div className="banner">
      <button
        type="button"
        onClick={() => handleIndexUpdate(activeIndex - 1)}
        className="banner__button"
      >
        <img
          src="./icons/chevron-left.svg"
          alt="Left arrow"
        />
      </button>

      <div
        className="banner__container"
      >
        <div
          className="banner__inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map(img => (
            <img
              className="banner__img"
              src={img}
              key={img}
              alt="Banner"
            />
          ))}
        </div>

        <div className="banner__indicators">
          {images.map((img, index) => (
            <button
              type="button"
              aria-label="Banner indicator"
              className={classNames(
                'banner__indicator', {
                  'banner__indicator--active': activeIndex === index,
                },
              )}
              key={img}
              onClick={() => handleIndexUpdate(index)}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleIndexUpdate(activeIndex - 1)}
        className="banner__button"
      >
        <img
          src="./icons/chevron-right.svg"
          alt="Left arrow"
        />
      </button>
    </div>
  );
};
