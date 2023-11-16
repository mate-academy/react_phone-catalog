import { useEffect, useState } from 'react';

import productsFromServer from '../../helpers/api/products.json';
import { Product } from '../../helpers/types/Product';
import './PhonesPage.scss';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { NoResults } from '../../components/NoResults';

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
    <div className="PhonesPage">
      <div className="PhonesPage__path">
        <img src="img/icons/home_icon.svg" alt="Home Icon" />
        <img src="img/icons/vector_icon_gray.svg" alt="Home Icon" />
        <p className="PhonesPage__path-folder">Phones</p>
      </div>

      <h1 className="PhonesPage__title">Mobile Phones</h1>
      <p className="PhonesPage__amount">{`${phones.length} models`}</p>

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
