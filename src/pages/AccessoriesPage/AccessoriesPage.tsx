import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { getAccessories } from '../../helpers/getAccessories';

type Props = {
  products: Product[],
};

export const AccessoriesPage: FC<Props> = ({ products }) => {
  const accessories = getAccessories(products);

  return (
    <ProductsList products={accessories} title="Accessories" />
  );
};
