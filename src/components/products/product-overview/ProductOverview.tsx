import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import { TProductBase } from '@utils/types/productBase.type';

import { ProductSpec } from '../index';
import { CardDescription } from '../product-detail';
import styles from './ProductOverview.module.scss';

type TProps = {
  selectedProduct: TProductBase;
};

export const ProductOverview: FC<TProps> = ({ selectedProduct }) => {
  const {
    description,
    screen,
    resolution,
    capacity,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = selectedProduct;
  const { t } = useTranslation();
  const localAbout = t('product.about');
  const localTech = t('product.tech.title');

  return (
    <div className={styles.overview}>
      <div>
        <Title level={3}>{localAbout}</Title>

        <hr />
        <CardDescription description={description} />
      </div>

      <div>
        <Title level={3}>{localTech}</Title>
        <hr />
        <ProductSpec
          screen={screen}
          resolution={resolution}
          capacity={capacity}
          processor={processor}
          ram={ram}
          camera={camera}
          zoom={zoom}
          memory={capacity}
          cell={cell}
        />
      </div>
    </div>
  );
};
