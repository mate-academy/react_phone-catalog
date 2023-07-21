import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Search } from '../../components/Search';
import { ProductsList } from '../../components/ProductsList';
import { getPhones } from '../../helpers/getPhones';

type Props = {
  products: Product[],
};

export const PhonesPage: FC<Props> = ({ products }) => {
  const phones = getPhones(products);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <>
      {query ? (
        <Search products={phones} title="Search" />
      ) : (
        <ProductsList products={phones} title="Mobile phones" />
      )}
    </>
  );
};

// Create getPhones API call fetching the products with the type: phone
// Add ProductsList with data-cy="productList" attribute showing all the phones
// Implement a Loader to show it while waiting for the data from server
