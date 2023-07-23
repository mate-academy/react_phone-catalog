/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

interface PhotoGalleryProps {
  images: string[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [
    currentMainPhoto,
    setCurrentMainPhoto,
  ] = useState(`new/${images[0]}`);

  const correctSrc = (str: string) => {
    return `new/${str}`;
  };

  const onPhotoHandler = (str: string) => {
    const src = correctSrc(str);

    setCurrentMainPhoto(src);
  };

  return (
    <div className="photos description__photos">
      <ul className="photos__list">
        {images.map(img => (
          <li className="photos__item" key={img}>
            <img
              onClick={() => onPhotoHandler(img)}
              src={correctSrc(img)}
              alt="photos"
              className="photos__link"
            />
          </li>
        ))}
      </ul>
      <div className="photos__main-container">
        <img
          src={currentMainPhoto}
          alt="main"
          className="photos__main"
        />
      </div>
    </div>
  );
};
