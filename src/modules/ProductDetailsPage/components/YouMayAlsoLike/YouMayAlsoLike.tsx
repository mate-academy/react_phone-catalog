import React from 'react';
import { ProductSlider } from '../../../../components/ProductSlider';
import { Product } from '../../../../types/Product';
import classNames from 'classnames';
import { SectionTitle } from '../../../HomePage/components/SectionTitle/SectionTitle';

type Props = {
  products: Product[];
  className?: string;
};

export const YouMayAlsoLike: React.FC<Props> = ({
  products,
  className = '',
}) => {
  return (
    <section className={className}>
      <ProductSlider products={products}>
        <SectionTitle title="You may also like" />
      </ProductSlider>
    </section>
  );
};
