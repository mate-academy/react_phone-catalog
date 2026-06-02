/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { ProductGallery } from './сomponents/ProductGallery';
import { ProductActions } from './сomponents/ProductActions';
import { ProductAbout } from './сomponents/ProductAbout';
import { ProductTechSpecs } from './сomponents/ProductTechSpecs';

import { ProductDetailsType } from '@/modules/shared/utils/types';

import styles from './ProductCardDetails.module.scss';
//#endregion IMPORTS

//#region STYLES
const {
  details,
  title,
  mainSection,
  infoSection,
} = styles;
//#endregion STYLES

interface Props {
  product: ProductDetailsType;
}

export const ProductCardDetails: React.FC<Props> = ({ product }) => {
  //#region RENDER
  return (
    <div className={details}>
      <h2 className={title}>{product.name}</h2>

      <div className={mainSection}>
        <ProductGallery images={product.images} />
        <ProductActions product={product} />
      </div>

      <div className={infoSection}>
        <ProductAbout description={product.description} />
        <ProductTechSpecs product={product} />
      </div>
    </div>
  );
  //#endregion RENDER
};
