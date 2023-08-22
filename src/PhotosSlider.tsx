import { useState, useEffect } from 'react';
import classNames from 'classnames';

export const PhotosSlider: React.FC = () => {
  const [activeImage, setActiveImage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage(prevImage => {
        if (prevImage === 3) {
          return 1;
        }

        return prevImage + 1;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="slider slider--photos">
        <button
          type="button"
          aria-label="Scroll left"
          className="slider__button slider__button--photos"
          onClick={() => {
            if (activeImage === 1) {
              setActiveImage(3);
            } else {
              setActiveImage(activeImage - 1);
            }
          }}
        />
        <div className="slider__container">
          {[1, 2, 3].map(imageNumber => (
            <div
              className={classNames(
                'slider__photo',
                { 'slider__photo--active': imageNumber === activeImage },
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Scroll right"
          className="slider__button slider__button--photos"
          onClick={() => {
            if (activeImage === 3) {
              setActiveImage(1);
            } else {
              setActiveImage(activeImage + 1);
            }
          }}
        />
      </div>
      <div className="slider__indicator_container">
        <div className={classNames(
          'slider__indicator',
          { 'slider__indicator--active': activeImage === 1 },
        )}
        />
        <div className={classNames(
          'slider__indicator',
          { 'slider__indicator--active': activeImage === 2 },
        )}
        />
        <div className={classNames(
          'slider__indicator',
          { 'slider__indicator--active': activeImage === 3 },
        )}
        />
      </div>
    </>
  );
};
