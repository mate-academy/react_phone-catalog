import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { BASE_URL } from '../../../utils/fetchHelper';

import './ImageGalleryWithChoice.scss';

interface Props {
  images: string[],
  altes?: string[],
  className?: string,
}

const BASE_CLASS = 'image-gallery-with-choice';

export const ImageGalleryWithChoice: React.FC<Props> = memo(({
  images,
  className,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  const selectImage = useCallback((img: string) => {
    return () => {
      setSelectedImage(img);
    };
  }, []);

  /* eslint-disable */

  return (
    <section className={`${BASE_CLASS} ${className || ''}`}>
      <div className={`${BASE_CLASS}__images`}>
        {images.map(img => (
          <ImageItem
            key={img}
            img={img}
            selectImage={selectImage}
            isSelected={selectedImage === img}
          />
        ))}
      </div>

      <div className={`${BASE_CLASS}__selected-image-container`}>
        <img
          className={`${BASE_CLASS}__selected-image`}
          src={`${BASE_URL}/${selectedImage}`}
          alt="selected Image Product"
          loading="lazy"
        />
      </div>
    </section>
  );
  /* eslint-enable */
});

interface ImageProps {
  img: string,
  isSelected: boolean,
  selectImage: (img: string) => () => void;
}

const ImageItem: React.FC<ImageProps> = memo(({
  img,
  isSelected,
  selectImage,
}) => {
  const classes = [
    `${BASE_CLASS}__image-container`,
    `${isSelected ? `${BASE_CLASS}__image-container--selected` : ''}`,
  ].join(' ');

  /* eslint-disable */
  return (
    <div className={classes} onClick={selectImage(img)}>
      <img
        className={`${BASE_CLASS}__image`}
        src={`${BASE_URL}/${img}`}
        alt="Product image"
        loading="lazy"
      />
    </div> // need normal alt attribute
  );
  /* eslint-enable */
});
