import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductsSlider } from '@components/products/';

import { useProducts } from '@hooks/index';

import styles from './NewModels.module.scss';

export const NewModels: FC = () => {
  const { newModels } = useProducts();
  const { t } = useTranslation();
  const localTitle = t('home.new');

  return (
    <section className={styles.newModels}>
      <ProductsSlider title={localTitle} products={newModels} />
    </section>
  );
};
