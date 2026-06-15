/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { ProductGallerySkeleton } from './сomponents/ProductGallery/ProductGallerySkeleton';
import { ProductActionsSkeleton } from './сomponents/ProductActions/ProductActionsSkeleton';
import { ProductAboutSkeleton } from './сomponents/ProductAbout/ProductAboutSkeleton';
import { ProductTechSpecsSkeleton } from './сomponents/ProductTechSpecs/ProductTechSpecsSkeleton';

import styles from './ProductCardDetails.module.scss';
//#endregion

//#region STYLES
const {
  detailsContainer,
  detailsTitle,
  detailsGrid,
} = styles;
//#endregion

export const ProductCardDetailsSkeleton = () => {
  //#region RENDER
  return (
    <div className={detailsContainer}>
      <h2 className={detailsTitle}>
        <Skeleton width={'75%'} height={'100%'}/>
      </h2>

      <div className={detailsGrid}>
        <ProductGallerySkeleton />
        <ProductActionsSkeleton />
        <ProductAboutSkeleton />
        <ProductTechSpecsSkeleton />
      </div>
    </div>
  );
  //#endregion RENDER
};
