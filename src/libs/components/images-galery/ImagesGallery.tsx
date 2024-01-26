import { useState } from 'react';
import classNames from 'classnames';

import './styles.scss';

import { IMG_ROOT_PATH } from '../../enums';

type Props = {
  images: string[],
  className?: string,
};

export const ImagesGallery: React.FC<Props> = ({ images, className }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <section className={classNames(className, 'image-gallery')}>
      <div className="image-gallery__previews">
        {images.map(image => (
          <button
            key={image}
            type="button"
            aria-label="Preview"
            className={classNames('image-gallery__preview', {
              'image-gallery__preview--selected': image === selectedImage,
            })}
            onClick={() => handleSelect(image)}
          >
            <img
              className="image-gallery__image"
              src={`${IMG_ROOT_PATH}/${image}`}
              alt="Preview"
            />
          </button>
        ))}
      </div>

      <div className="image-gallery__selected-img">
        <img
          className="image-gallery__image"
          src={`${IMG_ROOT_PATH}/${selectedImage}`}
          alt="Preview"
        />
      </div>
    </section>
  );
};
