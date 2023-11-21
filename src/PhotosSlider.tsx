import { useState, useEffect } from 'react';
import classNames from 'classnames';

export const PhotosSlider: React.FC = () => {
  const [activeImage, setActiveImage] = useState(1);

  const handleScroll = (
    imageToSet: number,
    currentImage: number,
    direction: number,
  ) => {
    if (activeImage === currentImage) {
      setActiveImage(imageToSet);
    } else {
      setActiveImage(activeImage + direction);
    }
  };

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
  }, [activeImage]);

  return (
    <>
      <div className="slider slider--photos">
        <button
          type="button"
          aria-label="Scroll left"
          className="slider__button slider__button--photos"
          onClick={() => handleScroll(3, 1, -1)}
        />
        <div className="slider__container">
          {[1, 2, 3].map(imageNumber => (
            <div
              className={classNames(
                'slider__photo',
                { 'slider__photo--active': imageNumber === activeImage },
              )}
              key={imageNumber}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Scroll right"
          className="slider__button slider__button--photos"
          onClick={() => handleScroll(1, 3, +1)}
        />
      </div>
      <div className="slider__indicator_container">
        <button
          type="button"
          aria-label="Change photo"
          className={classNames(
            'slider__indicator',
            { 'slider__indicator--active': activeImage === 1 },
          )}
          onClick={() => setActiveImage(1)}
        />
        <button
          type="button"
          aria-label="Change photo"
          className={classNames(
            'slider__indicator',
            { 'slider__indicator--active': activeImage === 2 },
          )}
          onClick={() => setActiveImage(2)}
        />
        <button
          type="button"
          aria-label="Change photo"
          className={classNames(
            'slider__indicator',
            { 'slider__indicator--active': activeImage === 3 },
          )}
          onClick={() => setActiveImage(3)}
        />
      </div>
    </>
  );
};
