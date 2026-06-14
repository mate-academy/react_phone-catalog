/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { ProductDetailsType as ProductType } from '@/modules/shared/utils/types';

import styles from './ProductTechSpecs.module.scss';
//#endregion

//#region STYLES
const {
  specsContainer,
  specsTitle,
  specsList,
  specsItem,
  specsLabel,
  specsValue,
} = styles;
//#endregion

//#region HELPERS
const getTechSpecsData = (product: ProductType): Record<string, string> => {
  const capacityLabel = product.category === 'accessories'
    ? 'Capacity'
    : 'Built in memory';

  const specsData: Record<string, string> = {
    Screen: product.screen,
    Resolution: product.resolution,
    Processor: product.processor,
    RAM: product.ram,
    [capacityLabel]: product.capacity,
  };

  if (product.camera) {
    specsData.Camera = product.camera;
  }

  if (product.zoom) {
    specsData.Zoom = product.zoom;
  }

  if (product.cell && product.cell.length > 0) {
    specsData.Cell =
      product.cell[0] === 'Not applicable'
        ? 'Wi-Fi only'
        : product.cell.join(', ');
  }

  return specsData;
};
//#endregion

interface Props {
  product: ProductType;
}

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  //#region DATA
  const techSpecs = getTechSpecsData(product);
  //#endregion

  //#region RENDER
  return (
    <div className={specsContainer}>
      <h3 className={specsTitle}>Tech specs</h3>

      <div className={specsList}>
        {Object.entries(techSpecs).map(([label, value]) => (
          <div key={label} className={specsItem}>
            <p className={specsLabel}>{label}</p>
            <p className={specsValue}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
  //#endregion
};
