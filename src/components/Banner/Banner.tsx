import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const Banner = () => {
  const [position, setPosition] = useState(0);
  const bannerImg = [
    '/new/img/banner-phones.png',
    '/new/img/banner-accessories.png',
    '/new/img/banner-tablets.png',
  ];

  const imgWidth = 1040;
  const maxPosition = imgWidth * (bannerImg.length - 1);

  const handleClickNext = () => {
    const newPosition = position - imgWidth;

    if (position === maxPosition) {
      setPosition(0);
    } else {
      setPosition(newPosition);
    }
  };

  const handleClickPrev = () => {
    const newPosition = position + imgWidth;

    if (position === 0) {
      setPosition(maxPosition);
    } else {
      setPosition(newPosition);
    }
  };

  const handleIndicator = (index: number) => {
    setPosition(imgWidth * index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleClickNext();
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
        onClick={handleClickPrev}
      >
        {}
      </button>

      <div className="banner__caroucel">
        <ul
          className="banner__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: 'transform 0.5s',
            width: imgWidth * bannerImg.length,
          }}
        >
          {bannerImg.map((img, index) => (
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
        onClick={handleClickNext}
      >
        {}
      </button>

      <div className="banner__indicators">
        {bannerImg.map((img, index) => (
          <button
            key={img}
            type="button"
            className={classNames('banner__indicator', {
              'banner__indicator--active': position === imgWidth * index,
            })}
            onClick={() => handleIndicator(index)}
          >
            {}
          </button>
        ))}
      </div>
    </div>
  );
};
