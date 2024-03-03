import { memo, useState } from 'react';
import './ImageSelector.scss';
import cn from 'classnames';
import { BASE_URL } from '../../utils/fetchClient';
import { ImageSelectorProps } from './types';

export const ImageSelector = memo<ImageSelectorProps>(({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="image-selector">
      <div className="image-selector__images">
        {images?.map(image => (
          <button
            type="button"
            onClick={() => setSelectedImage(image)}
            className={cn('image-selector__image', {
              'image-selector__image-active': image === selectedImage,
            })}
            key={image}
          >
            <img
              src={`${BASE_URL}${image}`}
              alt="product_image"
            />
          </button>
        ))}
      </div>
      <div className="image-selector__container">
        <img
          className="image-selector__image-selected"
          src={`${BASE_URL}${selectedImage}`}
          alt="huge_image"
        />
      </div>

    </div>
  );
});
