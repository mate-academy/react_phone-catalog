import { useEffect, useState } from 'react';

import './styles/Page.scss';
import productsFromServer from '../helpers/api/products.json';
import { Product } from '../helpers/types/Product';

import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setPhones(
      productsFromServer
        .filter(product => product.type === 'phone') as Product[],
    );

    setIsLoading(false);
  }, []);

  return (
    <div className="Page">
      <Breadcrumbs />

      <div className="Page__top">
        <h1 className="Page__title">Mobile Phones</h1>
        <p className="Page__amount">{`${phones.length} models`}</p>
      </div>

      {isLoading && (
        <Loader />
      )}

      {!isLoading && !phones.length ? (
        <NoResults categoryName="Mobile phones" />
      ) : (
        <ProductsList products={phones} />
      )}
    </div>
  );
};
