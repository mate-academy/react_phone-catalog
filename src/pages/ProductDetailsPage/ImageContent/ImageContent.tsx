import React, { useState } from 'react';

import './ImageContent.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  itemName: string;
};

export const ImageContent: React.FC<Props> = ({ images, itemName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const mainImage = images.find(img => img === selectedImage) || images[0];

  return (
    <div className="imageContent">
      <div className="imageContent__tablet">
        {images.map(image => (
          <img
            key={image}
            src={image}
            alt={`${itemName}`}
            className={classNames('imageContent__image', {
              ['imageContent__image-selected']: image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <div className="imageContent__mainImages">
        <img
          key={mainImage}
          src={mainImage}
          alt={itemName}
          className="imageContent__mainImages-images"
        />
      </div>

      <div className="imageContent__mobile">
        {images.map(image => (
          <img
            key={image}
            src={image}
            alt={itemName}
            className={classNames('imageContent__image', {
              ['imageContent__image-selected']: image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};
