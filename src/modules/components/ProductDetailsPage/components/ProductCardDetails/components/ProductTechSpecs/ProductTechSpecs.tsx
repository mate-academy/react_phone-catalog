/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useTranslation } from 'react-i18next';

import {
  CategoryType,
  ProductDetailsType as ProductType,
} from '@/modules/shared/utils/types';

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
const getTechSpecsData = (
  product: ProductType,
  t: (key: string) => string,
): Record<string, string> => {
  const capacityKey =
    (product.category as CategoryType) === 'accessories'
      ? 'size'
      : 'builtInMemory';

  const specsData: Record<string, string> = {
    screen: product.screen,
    resolution: product.resolution,
    processor: product.processor,
    ram: product.ram,
    [capacityKey]: product.capacity,
  };

  if (product.camera) {
    specsData.camera = product.camera;
  }

  if (product.zoom) {
    specsData.zoom = product.zoom;
  }

  if (product.cell && product.cell.length > 0) {
    specsData.cell =
      product.cell[0] === 'Not applicable' ||
      product.cell[0] === 'Не застосовується'
        ? t('productDetailsPage.techSpecs.value.wifiOnly')
        : product.cell.join(', ');
  }

  return specsData;
};
//#endregion

interface Props {
  product: ProductType;
}

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  //#region HOOKS
  const { t } = useTranslation();
  //#endregion

  //#region DATA_PROCESSING
  const techSpecs = getTechSpecsData(product, t);
  //#endregion

  //#region RENDER
  return (
    <div className={specsContainer}>
      <h3 className={specsTitle}>{t('productDetailsPage.techSpecs.title')}</h3>

      <div className={specsList}>
        {Object.entries(techSpecs).map(([label, value]) => (
          <div key={label} className={specsItem}>
            <p className={specsLabel}>
              {t(`productDetailsPage.techSpecs.label.${label}`)}
            </p>
            <p className={specsValue}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
  //#endregion
};
