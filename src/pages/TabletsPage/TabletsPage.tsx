import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { getTablets } from '../../helpers/getTablets';

type Props = {
  products: Product[],
};

export const TabletsPage: FC<Props> = ({ products }) => {
  const tablets = getTablets(products);

  return (
    <ProductsList products={tablets} title="Tablets" />
  );
};
