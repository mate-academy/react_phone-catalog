/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { ProductGallery } from './components/ProductGallery';
import { ProductActions } from './components/ProductActions';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs';

import { ProductDetailsType } from '@/modules/shared/utils/types';

import styles from './ProductCardDetails.module.scss';
//#endregion IMPORTS

//#region STYLES
const { detailsContainer, detailsTitle, detailsGrid } = styles;
//#endregion STYLES

interface Props {
  product: ProductDetailsType;
}

export const ProductCardDetails: React.FC<Props> = ({ product }) => {
  //#region RENDER
  return (
    <div className={detailsContainer}>
      <h2 className={detailsTitle}>{product.name}</h2>

      <div className={detailsGrid}>
        <ProductGallery images={product.images} />
        <ProductActions product={product} />
        <ProductAbout description={product.description} />
        <ProductTechSpecs product={product} />
      </div>
    </div>
  );
  //#endregion RENDER
};
