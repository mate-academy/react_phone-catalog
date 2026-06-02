/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { ProductDetailsType as ProductType } from '@/modules/shared/utils/types';

const getTechSpecsData = (product: ProductType): Record<string, string> => {
  const capacityLabel = product.category === 'accessories'
    ? 'Capacity'
    : 'Built in memory';

  const specs: Record<string, string> = {
    Screen: product.screen,
    Resolution: product.resolution,
    Processor: product.processor,
    RAM: product.ram,
    [capacityLabel]: product.capacity,
  };

  if (product.camera) {
    specs.Camera = product.camera;
  }

  if (product.zoom) {
    specs.Zoom = product.zoom;
  }

  if (product.cell && product.cell.length > 0) {
    specs.Cell =
      product.cell[0] === 'Not applicable'
        ? 'Wi-Fi only'
        : product.cell.join(', ');
  }

  return specs;
};

import styles from './ProductTechSpecs.module.scss';

const {
  specs,
  specsTitle,
  specsList,
  specsItem,
  specsLabel,
  specsValue,
} = styles;

export const ProductTechSpecs = (
  { product }: { product: ProductType }
) => {
  const techSpecs = getTechSpecsData(product);

  return (
    <div className={specs}>
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
};
