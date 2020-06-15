import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/api';
import { Card } from '../Card/Card';
import './AccessoriesPage.scss';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const loadedProduct = await getProducts();

        setAccessories(loadedProduct
          .filter((product: Product) => product.type === 'accessories'));
        setIsLoaded(true);
      } catch (error) {
        setErrorMessage('Oops! Reload page, please');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      {isLoading
        && (
          <div className="Loading">
            Loading...
          </div>
        )}
      {isLoaded && (
        <div className="Accessories AccessoriesContainer">
          <Breadcrumbs />
          <h1
            className="Accessories__Title"
          >
            Currently there are no products.
          </h1>
          <div className="Accessories__noGoods">
            <img
              src="./img/cat_noGoods.png"
              alt="no Goods"
              className="Accessories__Img"
            />
          </div>
          <div className="Accessories__Img">
            {accessories.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
