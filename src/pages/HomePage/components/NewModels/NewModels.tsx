import React from 'react';
import classNames from 'classnames';
import { Product } from '../../../../types';
import { useStateContext } from '../../../../state/state';
import { ProductsSlider } from '../../../../components';

type Props = {
  className?: string;
};

export const NewModels: React.FC<Props> = ({ className }) => {
  const { state } = useStateContext();
  const sortByYear = (a: Product, b: Product) => b.year - a.year;

  const latestYear = Math.max(...state.products.map(product => product.year));

  const latestProducts = state.products.filter(
    product => product.year === latestYear,
  );

  return (
    <section className={classNames(className, 'new-models')}>
      <ProductsSlider
        title="Brand New Models"
        sortFunction={sortByYear}
        slides={latestProducts}
      />
    </section>
  );
};
