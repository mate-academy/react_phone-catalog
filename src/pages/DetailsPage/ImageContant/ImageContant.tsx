import React, { useEffect, useState } from 'react';

import './ImageContant.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  itemName: string;
};

const ImageContant: React.FC<Props> = ({ images, itemName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = images.indexOf(selectedImage);

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  }, [selectedImage, images, activeIndex]);

  return (
    <div className="imageContant">
      <div className="imageContant__tablet">
        {images.map(image => (
          <img
            key={image}
            src={image}
            alt={`${itemName}`}
            className={classNames('imageContant__image', {
              ['imageContant__image-selected']: image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <div className="imageContant__mainImages">
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={itemName}
            className={classNames('imageContant__mainImages-images', {
              ['imageContant__mainImages-images-active']: index === activeIndex,
            })}
          />
        ))}
      </div>

      <div className="imageContant__mobile">
        {images.map(image => (
          <img
            key={image}
            src={image}
            alt={itemName}
            className={classNames('imageContant__image', {
              ['imageContant__image-selected']: image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageContant;
