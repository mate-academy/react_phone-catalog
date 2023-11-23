import React, { useState } from 'react';

interface PhotoGalleryProps {
  images: string[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [
    currentMainPhoto,
    setCurrentMainPhoto,
  ] = useState(`https://mate-academy.github.io/react_phone-catalog/_new/${images[0]}`);

  const correctSrc = (str: string) => {
    return `https://mate-academy.github.io/react_phone-catalog/_new/${str}`;
  };

  const onPhotoHandler = (str: string) => {
    const src = correctSrc(str);

    setCurrentMainPhoto(src);
  };

  return (
    <div className="photos description__photos">
      <ul className="photos__list">
        {images.map(img => (
          <button
            type="button"
            className="photos__item"
            key={img}
            onClick={() => onPhotoHandler(img)}
          >
            <img
              src={correctSrc(img)}
              alt="photos"
              className="photos__link"
            />
          </button>
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
