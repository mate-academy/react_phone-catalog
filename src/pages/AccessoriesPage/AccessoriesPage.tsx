import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { getAccessories } from '../../helpers/getAccessories';
import { Search } from '../../components/Search';

type Props = {
  products: Product[],
};

export const AccessoriesPage: FC<Props> = ({ products }) => {
  const accessories = getAccessories(products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <>
      {query ? (
        <Search products={accessories} />
      ) : (
        <ProductsList products={accessories} title="Accessories" />
      )}
    </>
  );
};
