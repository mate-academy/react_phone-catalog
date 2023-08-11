import { useEffect, useState } from 'react';
import cn from 'classnames';

const dotsId = [0, 1, 2];

const photos = [
  './img/img/banner-phones.png',
  './img/img/banner-tablets.png',
  './img/img/banner-accessories.png',
].map((url) => {
  return (
    <img
      className="photos__photo"
      src={url}
      alt="Accessories"
      key={url}
    />
  );
});

const duration = 1000;

export const Photos = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (currentPhotoIndex < 0) {
      setCurrentPhotoIndex(photos.length - 1);
    }

    if (currentPhotoIndex > photos.length - 1) {
      setCurrentPhotoIndex(0);
    }

    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, duration);
  }, [currentPhotoIndex]);

  const onLeftClick = () => {
    setCurrentPhotoIndex(currentIndex => currentIndex - 1);
  };

  const onRightClick = () => {
    setCurrentPhotoIndex(currentIndex => currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      onRightClick();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPhotoIndex]);

  return (
    <div className="photos">
      <div className="photos__container">
        <button
          className={cn(
            'photos__button photos__button--left',
          )}
          type="button"
          aria-label="Left button"
          onClick={onLeftClick}
          disabled={isDisabled}
        />

        <div className="photos__slider-track">
          {photos.map((photo, photoIndex) => {
            const newPosition = { ...photo };

            newPosition.props = {
              ...newPosition.props,
              className: 'photos__photo photos__photo--next',
            };

            if (photoIndex === currentPhotoIndex) {
              newPosition.props = {
                ...newPosition.props,
                className: 'photos__photo photos__photo--current',
              };
            }

            if (photoIndex === currentPhotoIndex - 1 || (
              currentPhotoIndex === 0 && photoIndex === photos.length - 1
            )) {
              newPosition.props = {
                ...newPosition.props,
                className: 'photos__photo photos__photo--prev',
              };
            }

            return newPosition;
          })}
        </div>

        <button
          className={cn(
            'photos__button photos__button--right',
          )}
          type="button"
          aria-label="Right button"
          onClick={onRightClick}
          disabled={isDisabled}
        />
      </div>

      <div className="photos__dots">
        {dotsId.map(id => (
          <div
            key={id}
            className={cn('photos__dot', {
              'photos__dot--active': id === currentPhotoIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
};
