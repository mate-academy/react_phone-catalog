// components/ProductGallery/ProductGallery.tsx
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductGallery.module.scss';

const cx = classNames.bind(styles);

type Props = {
  images: string[];
  name: string;
};

export const ProductGallery = ({ images, name }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const mainImage = images[selectedIndex] ?? images[0];

  return (
    <div className={cx('product-gallery')}>
      <div className={cx('product-gallery__thumbs')}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className={cx('product-gallery__thumb', {
              'product-gallery__thumb--active': index === selectedIndex,
            })}
            onClick={() => setSelectedIndex(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === selectedIndex}
          >
            <img
              className={cx('product-gallery__thumb-image')}
              src={`/${src}`}
              alt={`${name} preview ${index + 1}`}
            />
          </button>
        ))}
      </div>

      <div className={cx('product-gallery__main')}>
        <img
          className={cx('product-gallery__main-image')}
          src={`/${mainImage}`}
          alt={name}
        />
      </div>
    </div>
  );
};
