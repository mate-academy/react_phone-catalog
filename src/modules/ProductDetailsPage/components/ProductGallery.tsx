import React from 'react';
import cn from 'classnames';

import { block, cx, styles } from './styles';

interface Props {
  productName: string;
  images: string[];
  mainImage?: string;
  onSelectImage: (image: string) => void;
}

export const ProductGallery: React.FC<Props> = ({
  productName,
  images,
  mainImage,
  onSelectImage,
}) => (
  <div className={cx('gallery')}>
    <div className={cx('thumbs')}>
      {images.map((image, index) => (
        <button
          key={image}
          type="button"
          className={cn(cx('thumb'), {
            [styles[`${block}__thumb--active`]]: mainImage === image,
          })}
          onClick={() => onSelectImage(image)}
          aria-label={`Show image ${index + 1}`}
        >
          <img src={image} alt={`${productName} ${index + 1}`} />
        </button>
      ))}
    </div>

    <div className={cx('main-image')}>
      {mainImage ? (
        <img src={mainImage} alt={productName} />
      ) : (
        <div className={cx('no-image')}>No image</div>
      )}
    </div>
  </div>
);
