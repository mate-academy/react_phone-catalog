import { useEffect, useState } from 'react';

import './TabletsPage.scss';
import productsFromServer from '../../helpers/api/products.json';
import { Product } from '../../helpers/types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { NoResults } from '../../components/NoResults';

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
    <div className="TabletsPage">
      <div className="TabletsPage__path">
        <img src="img/icons/home_icon.svg" alt="Home Icon" />
        <img src="img/icons/vector_icon_gray.svg" alt="Home Icon" />
        <p className="TabletsPage__path-folder">Tablets</p>
      </div>

      <h1 className="TabletsPage__title">Tablets</h1>
      <p className="TabletsPage__amount">{`${tablets.length} models`}</p>

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
