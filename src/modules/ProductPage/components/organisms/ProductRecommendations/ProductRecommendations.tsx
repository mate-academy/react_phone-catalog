import React, { useMemo } from 'react';
import styles from './../../../ProductPage.module.scss';
import { ProductSlider } from '../../../../shared/organisms/ProductSlider';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../../hooks/hooks';
import { getRandomProducts } from '../../../../../helpers/getRandomProducts';

export const ProductRecommendations: React.FC = () => {
  const { t } = useTranslation();
  const { products } = useAppSelector(state => state.products);

  const recommended = useMemo(
    () => getRandomProducts(products, 12),
    [products],
  );

  return (
    <div className={styles.product__recommendations}>
      <ProductSlider
        title={t('slider.title.products.random')}
        productsList={recommended}
        id={3}
      />
    </div>
  );
};
