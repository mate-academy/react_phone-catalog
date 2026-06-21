/* eslint-disable max-len */
/* eslint-disable import/extensions */

//#region IMPORTS
import { ProductCardSkeleton } from '@/modules/shared/components/ProductCard/ProductCardSkeleton';

import styles from './ProductsSlider.module.scss';
//#endregion

//#region STYLES
const {
  sliderContainer,
  sliderHeader,
  sliderTitle,
  sliderViewport,
  sliderTrack,
} = styles;
//#endregion

export const ProductsSliderSkeleton = ({ title }: { title: string }) => {
  //#region RENDER
  return (
    <div className={sliderContainer}>
      <div className={sliderHeader}>
        <h2 className={sliderTitle}>{title}</h2>
      </div>

      <div className={sliderViewport}>
        <div className={sliderTrack}>
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
  //#endregion
};
