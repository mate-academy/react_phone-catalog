import { useEffect, useState } from 'react';

import './styles/Page.scss';
import productsFromServer from '../helpers/api/products.json';
import { Product } from '../helpers/types/Product';

import { Loader } from '../components/Loader';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTablets(
      productsFromServer
        .filter(product => product.type === 'tablet') as Product[],
    );

    setIsLoading(false);
  }, []);

  return (
    <div className="Page">
      <Breadcrumbs />

      <div className="Page__top">
        <h1 className="Page__title">Tablets</h1>
        <p className="Page__amount">{`${tablets.length} models`}</p>
      </div>

      {isLoading && (
        <Loader />
      )}

      {!isLoading && !tablets.length ? (
        <NoResults categoryName="Tablets" />
      ) : (
        <ProductsList products={tablets} />
      )}
    </div>
  );
};
