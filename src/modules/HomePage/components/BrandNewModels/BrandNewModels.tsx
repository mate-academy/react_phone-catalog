import React, { useMemo } from 'react';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { ProductSlider } from '../../../../components/ProductSlider';
import { Product } from '../../../../types/Product';
import brandNewModelsStyles from './BrandNewModels.module.scss';

type Props = {
  products: Product[];
};

export const BrandNewModels: React.FC<Props> = ({ products }) => {
  const visibleProducts = useMemo(
    () =>
      [...products].sort((product1, product2) => product2.year - product1.year),
    [products],
  );

  return (
    <section className={brandNewModelsStyles.brandNewModels}>
      <ProductSlider products={visibleProducts}>
        <SectionTitle title="Brand new models" />
      </ProductSlider>
    </section>
  );
};
