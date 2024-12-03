import styles from './ProductTechSpec.module.scss';
import classNames from 'classnames';
import { formatSpecText } from '../../../../utils/formatSpecText';
import { Product } from '../../../../types/Product';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  product: Product;
}

export const ProductTechSpec: React.FC<Props> = ({
  product: { capacity, screen, ram, resolution, processor, camera, zoom, cell },
}) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.productTechSpecContainer}>
      <h3 className={styles.aboutTitle}>{t('techSpecTitle')}</h3>
      <ul className={styles.productInfo}>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>{t('specs.screen')}</span>
          <span>{formatSpecText(screen)}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>{t('specs.resolution')}</span>
          <span>{resolution}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>{t('specs.processor')}</span>
          <span>{processor}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>{t('specs.ram')}</span>
          <span>{formatSpecText(ram)}</span>
        </li>
        <li
          className={classNames(styles.productInfoItem, styles.productSpecItem)}
        >
          <span>{t('specs.capacity')}</span>
          <span>{formatSpecText(capacity)}</span>
        </li>
        {!!camera && (
          <li
            className={classNames(
              styles.productInfoItem,
              styles.productSpecItem,
            )}
          >
            <span>{t('specs.camera')}</span>
            <span>{formatSpecText(camera)}</span>
          </li>
        )}
        {!!zoom && (
          <li
            className={classNames(
              styles.productInfoItem,
              styles.productSpecItem,
            )}
          >
            <span>{t('specs.zoom')}</span>
            <span>{formatSpecText(zoom)}</span>
          </li>
        )}
        {cell.includes('Not applicable') || (
          <li
            className={classNames(
              styles.productInfoItem,
              styles.productSpecItem,
            )}
          >
            <span>{t('specs.cell')}</span>
            <span>{cell.join(', ')}</span>
          </li>
        )}
      </ul>
    </div>
  );
};
