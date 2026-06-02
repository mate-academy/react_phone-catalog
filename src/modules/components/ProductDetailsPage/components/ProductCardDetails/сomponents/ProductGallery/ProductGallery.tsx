/* eslint-disable prettier/prettier */

import { useState } from 'react';

import styles from './ProductGallery.module.scss';

const {
  gallery,
  thumbsList,
  thumbsItem,
  thumbsItemActive,
  thumbsImage,
  preview,
  previewImage,
} = styles;

export const ProductGallery = (
  { images }: { images: string[] }
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentPreviewImage = images[activeIndex] || images[0];

  return (
    <div className={gallery}>
      <div className={thumbsList}>
        {images.map((imgUrl: string, index: number) => (
          <div
            className={`
              ${thumbsItem}
              ${activeIndex === index ? thumbsItemActive : ''}
            `}
            key={imgUrl}
            onClick={() => setActiveIndex(index)}
          >
            <img className={thumbsImage} src={`/${imgUrl}`} alt="" />
          </div>
        ))}
      </div>

      <div className={preview}>
        <img className={previewImage} src={`/${currentPreviewImage}`} alt="" />
      </div>
    </div>
  );
};
