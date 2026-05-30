import React from 'react';
import { AnyDetailedProduct } from '../../../../types/DetailedProductTypes';
import styles from './ProductTechSpecs.module.scss';
import { SpecItem } from '../../../../types/SpecItem';
import { SpecsDisplay } from '../../../../components/SpecsDisplay';
import useLanguageStore from '../../../../stores/useLanguageStore';

type Props = {
  product: AnyDetailedProduct;
};

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  const { t } = useLanguageStore();
  const { screen, resolution, processor, ram, capacity, cell } = product;
  let camera,
    zoom = '';

  if (product.category === 'phones' || product.category === 'tablets') {
    camera = product.camera;
    zoom = product.zoom;
  }

  const productCell = Array.isArray(cell) ? cell.join(', ') : cell;

  const detailedSpecs: SpecItem[] = [
    { labelKey: 'card_screen', value: screen || '' },
    { labelKey: 'card_resolution', value: resolution || '' },
    { labelKey: 'card_processor', value: processor || '' },
    { labelKey: 'card_ram', value: ram || '' },
    { labelKey: 'prod_det_page_capacity', value: capacity || '' },
    { labelKey: 'card_camera', value: camera || '' },
    { labelKey: 'card_zoom', value: zoom || '' },
    { labelKey: 'card_cell', value: productCell || '' },
  ].filter(spec => spec.value);

  return (
    <div className={styles['tech-specs']}>
      <h3 className={styles['tech-specs__title']}>
        {t('prod_det_page_tech_specs')}
      </h3>
      <div className={styles['tech-specs__divider']}></div>

      <SpecsDisplay specs={detailedSpecs} size="large" />
    </div>
  );
};
