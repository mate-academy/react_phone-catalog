import { useEffect, useState } from 'react';

import './AccessoriesPage.scss';
import productsFromServer from '../../helpers/api/products.json';
import { Product } from '../../helpers/types/Product';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { NoResults } from '../../components/NoResults';

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
    <div className="AccessoriesPage">
      <div className="AccessoriesPage__path">
        <img src="img/icons/home_icon.svg" alt="Home Icon" />
        <img src="img/icons/vector_icon_gray.svg" alt="Home Icon" />
        <p className="AccessoriesPage__path-folder">Accessories</p>
      </div>

      <h1 className="AccessoriesPage__title">Accessories</h1>
      <p className="AccessoriesPage__amount">{`${accessories.length} models`}</p>

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
