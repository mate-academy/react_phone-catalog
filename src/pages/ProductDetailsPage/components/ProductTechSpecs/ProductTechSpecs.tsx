import React from 'react';
import { AnyDetailedProduct } from '../../../../types/DetailedProductTypes';
import styles from './ProductTechSpecs.module.scss';
import useLanguageStore from '../../../../stores/useLanguageStore';

type Props = {
  product: AnyDetailedProduct;
};

export const ProductTechSpecs: React.FC<Props> = ({ product }) => {
  const { t } = useLanguageStore();

  const productCell = Array.isArray(product.cell)
    ? product.cell.join(', ')
    : product.cell;

  return (
    <div className={styles['tech-specs']}>
      <h3 className={styles['tech-specs__title']}>Tech Specs</h3>
      <div className={styles['tech-specs__divider']}></div>
      <ul className={styles['tech-specs__list']}>
        <li className={styles['tech-specs__item']}>
          <span className={styles['tech-specs__label']}>Screen</span>
          <span className={styles['tech-specs__value']}>{product.screen}</span>
        </li>

        <li className={styles['tech-specs__item']}>
          <span className={styles['tech-specs__label']}>Resolution</span>
          <span className={styles['tech-specs__value']}>
            {product.resolution}
          </span>
        </li>

        <li className={styles['tech-specs__item']}>
          <span className={styles['tech-specs__label']}>Processor</span>
          <span className={styles['tech-specs__value']}>
            {product.processor}
          </span>
        </li>

        <li className={styles['tech-specs__item']}>
          <span className={styles['tech-specs__label']}>RAM</span>
          <span className={styles['tech-specs__value']}>{product.ram}</span>
        </li>

        <li className={styles['tech-specs__item']}>
          <span className={styles['tech-specs__label']}>Built in memory</span>
          <span className={styles['tech-specs__value']}>
            {product.capacity}
          </span>
        </li>

        {(product.category === 'phones' || product.category === 'tablets') && (
          <>
            {/* product.camera тепер доступний, оскільки тип звужено до PhoneDetails | TabletDetails */}
            <li className={styles['tech-specs__item']}>
              <span className={styles['tech-specs__label']}>Camera</span>
              <span className={styles['tech-specs__value']}>
                {product.camera}
              </span>
            </li>

            {/* product.zoom тепер доступний */}
            <li className={styles['tech-specs__item']}>
              <span className={styles['tech-specs__label']}>Zoom</span>
              <span className={styles['tech-specs__value']}>
                {product.zoom}
              </span>
            </li>
          </>
        )}

        <li className={styles['tech-specs__item']}>
          <span className={styles['tech-specs__label']}>Cell</span>
          <span className={styles['tech-specs__value']}>{productCell}</span>
        </li>
      </ul>
    </div>
  );
};
