import { FC } from 'react';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { getPhones } from '../../helpers/getPhones';

type Props = {
  products: Product[],
};

export const FavouritesPage: FC<Props> = ({ products }) => {
  const phones = getPhones(products);

  return (
    <>
      <Breadcrumbs />
      <ProductsList products={phones} title="Mobile phones" />
    </>
  );
};
