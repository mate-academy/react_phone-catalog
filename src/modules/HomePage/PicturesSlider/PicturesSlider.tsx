import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Picture } from '../../../types/Picture';

type Props = {
  windowSize: number;
};

const imgs: Picture[] = [
  {
    id: 1,
    url: '/img/pictures-slider/slider-1.png',
    name: 'slider-1',
    alt: 'IPhone 14 Pro',
  },
  {
    id: 2,
    url: '/img/pictures-slider/slider-3.jpg',
    name: 'slider-3',
    alt: 'IPhone 14 Pro',
  },
  {
    id: 3,
    url: '/img/pictures-slider/slider-4.jpg',
    name: 'slider-4',
    alt: 'IPhone 14 Pro',
  },
];

export const PicturesSlider: React.FC<Props> = ({ windowSize }) => {
  const [position, setPosition] = useState<number>(0);

  const images = imgs.slice();

  // const [positionImages, setPositionImages] = useState<number>(windowSize);
  // const [positionImages, setPositionImages] = useState<number>(0);
  // const [pictures, setPictures] = useState<Picture[]>(imgs);

  const selectPicture = (index: number) => {
    setPosition(index * windowSize);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (position >= windowSize * (images.length - 1)) {
        setPosition(0);

        return;
      }

      setPosition(prevPosition => prevPosition + windowSize);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, position, windowSize]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const copyPictures = pictures.slice();
  //     const deletedPicture = copyPictures.shift();

  //     if (deletedPicture) {
  //       copyPictures.push(deletedPicture);

  //       setPictures(copyPictures);
  //     }
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [pictures, windowSize]);

  // console.log(lines);

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__images-wrapper">
        <div
          className="pictures-slider__images"
          style={{ left: `-${position}px` }}
        >
          {images.map(img => (
            <img
              key={img.id}
              src={img.url}
              alt={img.alt}
              className={`pictures-slider__img pictures-slider__img--${img.id}`}
            />
          ))}
          {/* {pictures.map(img => (
            <img
              key={img.id}
              src={img.url}
              alt={img.alt}
              className={`pictures-slider__img pictures-slider__img--${img.id}`}
            />
          ))} */}
        </div>
      </div>

      <div className="pictures-slider__lines">
        {images.map((img, index) => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            type="button"
            key={img.id}
            className={cn('pictures-slider__button', {
              'pictures-slider__button--active':
                position === windowSize * index,
            })}
            onClick={() => selectPicture(index)}
          />
        ))}
      </div>
    </div>
  );
};
