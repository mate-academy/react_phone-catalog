/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

interface Props {
  images: string[];
  imageUrl: string;
  name: string;
}

// export const Gallery: React.FC<Props> = ({ activePhone }) => {
export const Gallery: React.FC<Props> = ({ images, imageUrl, name }) => {
  const [activeSrc, setActiveSrc] = useState(imageUrl);

  const handleClick = (url: string) => {
    setActiveSrc(url);
  };

  return (
    <div className="gallery__img-wrapper">
      <ul className="gallery__img-list">
        {
          images.map(img => (
            <li key={img} className="gallery__item">
              <img
                className="gallery__image"
                src={img}
                alt={name}
                onClick={() => handleClick(img)}
              />
            </li>
          ))
        }
      </ul>
      <img className="gallery__main-image" src={activeSrc} alt={name} />
    </div>
  );
};
