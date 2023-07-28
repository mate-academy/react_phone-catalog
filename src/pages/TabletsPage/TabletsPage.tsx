import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../../components/ProductsList';
import { getTablets } from '../../helpers/getTablets';
import { Search } from '../../components/Search';

type Props = {
  products: Product[],
};

export const TabletsPage: FC<Props> = ({ products }) => {
  const tablets = getTablets(products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <>
      {query ? (
        <Search products={tablets} title="Search" />
      ) : (
        <ProductsList products={tablets} title="Tablets" />
      )}
    </>
  );
};
