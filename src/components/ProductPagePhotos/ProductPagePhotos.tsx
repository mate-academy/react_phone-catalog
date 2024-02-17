import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { v4 as getId } from 'uuid';

import { Button } from '../Button/Button';

type Props = {
  images: string[],
  currentPhoto: string,
  setCurrentPhoto: Dispatch<SetStateAction<string>>,
  name: string,
};

export const ProductPagePhotos: React.FC<Props> = ({
  images,
  currentPhoto,
  setCurrentPhoto,
  name,
}) => {
  return (
    <div className="product__photos">
      <div className="product__photos-list">
        {images.map(img => (
          <Button
            key={getId()}
            className={cn(
              'product__img-wrapper',
              {
                'product__img-wrapper--active': img === currentPhoto,
              },
            )}
            onClick={() => setCurrentPhoto(img)}
          >
            <img
              className="product__img"
              src={img}
              alt={name}
            />
          </Button>
        ))}
      </div>

      <div className="product__current-img-wrapper">
        <img
          className="product__current-img"
          src={currentPhoto}
          alt={name}
        />
      </div>
    </div>
  );
};
