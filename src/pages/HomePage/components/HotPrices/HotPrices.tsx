import React from 'react';
import { Product } from '../../../../types';
import { useStateContext } from '../../../../state/state';
import { ProductsSlider } from '../../../../components';
import classNames from 'classnames';

type Props = {
  className: string;
};

export const HotPrices: React.FC<Props> = ({ className }) => {
  const { state } = useStateContext();
  const sortByDiscount = (a: Product, b: Product) =>
    b.fullPrice - b.price - (a.fullPrice - a.price);

  return (
    <section className={classNames(className, 'hot-prices')}>
      <ProductsSlider
        title="Hot Prices"
        sortFunction={sortByDiscount}
        slides={state.products}
      />
    </section>
  );
};
