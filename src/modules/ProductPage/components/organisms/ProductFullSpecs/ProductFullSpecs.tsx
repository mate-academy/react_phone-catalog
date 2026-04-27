import React, { memo } from 'react';
import styles from './../../../ProductPage.module.scss';
import classNames from 'classnames';
import { Typography } from '../../../../shared/atoms/Typography';
import { Divider } from '../../../../shared/atoms/Divider';
import { ProductSpec } from '../../../../shared/molecules/ProductSpec';
import { ProductDetails } from '../../../../../types/ProductDetails';
import { useTranslation } from 'react-i18next';

type Props = {
  productDetails: ProductDetails;
  selectedCategory: string;
};

export const ProductFullSpecs = memo(
  ({ productDetails, selectedCategory }: Props) => {
    const { t } = useTranslation();
    return (
      <div
        className={classNames(
          styles.product__block,
          styles.product__specifications,
          styles.about,
        )}
      >
        <Typography variant="h3" tag="h3" className={styles.about__title}>
          {t('product.specifications.label')}
        </Typography>
        <div className={styles.about__body}>
          <Divider />
          <div className={styles.about__specs}>
            <ProductSpec
              label={t('product.specifications.screen')}
              value={productDetails?.screen}
            />
            <ProductSpec
              label={t('product.specifications.resolution')}
              value={productDetails?.resolution}
            />
            <ProductSpec
              label={t('product.specifications.processor')}
              value={productDetails?.processor}
            />
            <ProductSpec
              label={t('product.specifications.ram')}
              value={productDetails?.ram}
            />
            <ProductSpec
              label={t(
                selectedCategory === 'accessories'
                  ? 'product.specifications.display'
                  : 'product.specifications.builtInMemory',
              )}
              value={productDetails?.capacity}
            />
            {productDetails?.camera && (
              <ProductSpec
                label={t('product.specifications.camera')}
                value={productDetails?.camera}
              />
            )}
            {productDetails?.zoom && (
              <ProductSpec
                label={t('product.specifications.zoom')}
                value={productDetails?.zoom}
              />
            )}
            <ProductSpec
              label={t('product.specifications.cell')}
              value={productDetails?.cell.join(', ')}
            />
          </div>
        </div>
      </div>
    );
  },
);
