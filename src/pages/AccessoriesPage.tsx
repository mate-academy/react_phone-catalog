import { useEffect, useState } from 'react';

import './styles/Page.scss';
import productsFromServer from '../helpers/api/products.json';
import { Product } from '../helpers/types/Product';

import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setAccessories(
      productsFromServer
        .filter(product => product.type === 'accessory') as Product[],
    );

    setIsLoading(false);
  }, []);

  return (
    <div className="Page">
      <Breadcrumbs />

      <div className="Page__top">
        <h1 className="Page__title">Accessories</h1>
        <p className="Page__amount">{`${accessories.length} models`}</p>
      </div>

      {isLoading && (
        <Loader />
      )}

      {!isLoading && !accessories.length ? (
        <NoResults categoryName="Accessories" />
      ) : (
        <ProductsList products={accessories} />
      )}
    </div>
  );
};
