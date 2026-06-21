/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  //#region STATE_&_HOOK
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
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
              src={`${import.meta.env.BASE_URL}/${imgUrl}`}
              alt={t('productDetailsPage.gallery.thumbnail', {
                number: index + 1,
              })}
            />
          </div>
        ))}
      </div>

      <div className={preview}>
        <img
          className={previewImage}
          src={`${import.meta.env.BASE_URL}/${currentPreviewImage}`}
          alt={t('productDetailsPage.gallery.preview')}
        />
      </div>
    </div>
  );
  //#endregion
};
