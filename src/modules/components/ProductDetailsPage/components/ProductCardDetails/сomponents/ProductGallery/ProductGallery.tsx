/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useState } from 'react';

import styles from './ProductGallery.module.scss';
//#endregion

//#region STYLES
const {
  gallery,
  thumbsList,
  thumbsItem,
  thumbsItemActive,
  thumbsImage,
  preview,
  previewImage,
} = styles;
//#endregion

interface Props {
  images: string[];
}

export const ProductGallery: React.FC<Props> = ({ images }) => {
  //#region STATE
  const [activeIndex, setActiveIndex] = useState(0);
  //#endregion

  //#region DATA
  const currentPreviewImage = images[activeIndex] || images[0];
  //#endregion

  //#region RENDER
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
            <img
              className={thumbsImage}
              src={`/${imgUrl}`}
              alt={`Product thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className={preview}>
        <img
          className={previewImage}
          src={`/${currentPreviewImage}`}
          alt="Product preview"
        />
      </div>
    </div>
  );
  //#endregion
};
