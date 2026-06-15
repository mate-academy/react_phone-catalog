/* eslint-disable prettier/prettier */

//#region IMPORTS
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ProductGallery.module.scss';
//#endregion

//#region STYLES
const {
  gallery,
  thumbsList,
  thumbsItem,
  thumbsImage,
  preview,
  previewImage,
} = styles;
//#endregion

export const ProductGallerySkeleton = () => {
  //#region RENDER
  return (
    <div className={gallery}>
      <div className={thumbsList}>

        {Array.from({ length: 4 }).map((_, index) => (
          <div className={thumbsItem} key={index}>
            <Skeleton
              height="100%"
              width="100%"
              containerClassName={thumbsImage}
              style={{ alignItems: 'center' }}
            />
          </div>
        ))}
      </div>

      <div className={preview}>
        <Skeleton
          height="100%"
          width="80%"
          style={{ marginLeft: '10%' }}
          containerClassName={previewImage}
        />
      </div>
    </div>
  );
  //#endregion
};
