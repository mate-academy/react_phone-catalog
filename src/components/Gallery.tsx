import { useState } from 'react';
import classNames from 'classnames';

export const Gallery = () => {
  const [galleryShift, setGalleryShift] = useState(0);
  const [galleryDot, setGalleryDot] = useState(1);

  return (
    <div className="gallery gallery__home">
      <div
        className="gallery__container"
      >
        <button
          className={classNames('gallery__arrow gallery__arrow--left',
            { 'gallery__arrow--disabled': galleryShift === 0 })}
          type="button"
          onClick={() => {
            setGalleryShift(galleryShift === 0 ? galleryShift : galleryShift + 1040);
            setGalleryDot(galleryDot === 1 ? 1 : galleryDot - 1);
          }}
        >
          { }
        </button>
        <div className="gallery__window">
          <div
            className="gallery__picture-container"
            style={{ transform: `translateX(${galleryShift}px)` }}
          >
            <div>
              <img
                src="./img/Banner.png"
                alt="phone-banner"
                className="gallery__picture"
              />
            </div>
            <div>
              <img
                src="./img/Banner2.png"
                alt="phone-banner"
                className="gallery__picture"
              />
            </div>
            <div>
              <img
                src="./img/Banner3.png"
                alt="phone-banner"
                className="gallery__picture"
              />
            </div>
          </div>
        </div>
        <button
          className={classNames('gallery__arrow gallery__arrow--right',
            { 'gallery__arrow--disabled': galleryShift - 1040 <= -3120 })}
          type="button"
          onClick={() => {
            setGalleryShift(galleryShift - 1040 <= -3120 ? galleryShift : galleryShift - 1040);
            setGalleryDot(galleryDot === 3 ? 3 : galleryDot + 1);
          }}
        >
          { }
        </button>
      </div>
      <div className="gallery__dot-container">
        <span className={classNames('gallery__dot', { 'gallery__dot--active': galleryDot === 1 })} />
        <span className={classNames('gallery__dot', { 'gallery__dot--active': galleryDot === 2 })} />
        <span className={classNames('gallery__dot', { 'gallery__dot--active': galleryDot === 3 })} />
      </div>
    </div>
  );
};
