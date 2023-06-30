import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import './banner.scss';

interface Props {
  images: string[]
}

export const Banner: FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useAppSelector(state => state.theme.value);

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
        className={`banner__button banner__button--${theme}`}
      >
        {theme === 'light' ? (
          <img src="/public/_new/img/icons/arrow-left-dark.svg" alt="Left arrow" />
        ) : (
          <img src="/public/_new/img/icons/arrow-left-light.svg" alt="Left arrow" />
        )}
      </button>

      <div className="banner__container">
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
              className={
                classNames(
                  `banner__indicator banner__indicator--${theme}`, {
                    'banner__indicator--active': activeIndex === index,
                    [`banner__indicator--active__${theme}`]: activeIndex === index,
                  },
                )
              }
              key={img}
              onClick={() => handleIndexUpdate(index)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleIndexUpdate(activeIndex + 1)}
        className={`banner__button banner__button--${theme}`}
      >
        {theme === 'light' ? (
          <img src="/public/_new/img/icons/arrow-right-dark.svg" alt="Right arrow" />
        ) : (
          <img src="/public/_new/img/icons/arrow-right-light.svg" alt="Right arrow" />
        )}
      </button>
    </div>
  );
};
