import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import './banner.scss';

interface Props {
  images: string[]
}

export const Banner: FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="banner">
      <button
        onClick={() => handleIndexUpdate(activeIndex - 1)}
        className="banner__button"
      >
        <img src="/_new/img/icons/arrow-left.svg" alt="Left arrow" />
      </button>

      <div className="banner__container">
        <div
          className="banner__inner"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map(img => (
            <img className="banner__img" src={img} key={img} />
          ))}
        </div>

        <div className="banner__indicators">
          {images.map((_img, index) => (
            <button
              className={
                classNames('banner__indicator', { 'banner__indicator--active': activeIndex === index })
              }
              key={index}
              onClick={() => handleIndexUpdate(index)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => handleIndexUpdate(activeIndex + 1)}
        className="banner__button"
      >
        <img src="/_new/img/icons/arrow-right.svg" alt="Right arrow" />
      </button>
    </div>
  );
};
