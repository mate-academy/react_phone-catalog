import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './Slider.scss';

type Photo = {
  id: number;
  z_index: number;
  url: string;
};

const sliderPhotos = [
  { id: 1, z_index: 5, url: 'img/slider_photos/photo1.png' },
  { id: 2, z_index: 4, url: 'img/slider_photos/photo2.png' },
  { id: 3, z_index: 3, url: 'img/slider_photos/photo3.png' },
  { id: 4, z_index: 2, url: 'img/slider_photos/photo4.png' },
  { id: 5, z_index: 1, url: 'img/slider_photos/photo5.png' },
];

export const Slider: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([...sliderPhotos]);

  const changeZIndex = (direction: string, zIndex:number) => {
    let newZIndex = zIndex;

    if (direction === 'back') {
      /* eslint-disable-next-line */
      zIndex === 1
        ? newZIndex = 5
        : newZIndex = zIndex - 1;
    }

    if (direction === 'forward') {
      /* eslint-disable-next-line */
      zIndex === 5
        ? newZIndex = 1
        : newZIndex = zIndex + 1;
    }

    return newZIndex;
  };

  const moveSlider = (direction: string) => {
    const newList: Photo[] = [];

    for (let i = 0; i < photos.length; i += 1) {
      const changedPhoto: Photo = {
        id: photos[i].id,
        z_index: changeZIndex(direction, photos[i].z_index),
        url: photos[i].url,
      };

      newList.push(changedPhoto);
    }

    setPhotos(newList);
  };

  useEffect(() => {
    const timer = setTimeout(() => moveSlider('forward'), 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [photos]);

  return (
    <div className="Slider">
      <div className="Slider__main">
        <button
          type="button"
          className="Slider__button"
          onClick={() => moveSlider('back')}
        >
          <div className="icon icon--arrow-left" />
        </button>

        <div className="Slider__photo-container">
          {photos.map(photo => (
            <img
              key={photo.id}
              src={photo.url}
              alt=""
              className="Slider__photo"
              style={{ zIndex: photo.z_index }}
            />
          ))}
        </div>

        <button
          type="button"
          className="Slider__button"
          onClick={() => moveSlider('forward')}
        >
          <div className="icon icon--arrow-right" />
        </button>
      </div>

      <div className="Slider__footer">
        {photos.map(photo => (
          <div
            key={photo.id}
            className={classNames(
              'Slider__indicator',
              { 'Slider__indicator--active': photo.z_index === 5 },
            )}
          />
        ))}
      </div>
    </div>
  );
};
