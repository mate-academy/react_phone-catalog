import React, { useState, useEffect } from 'react';
import { getProducts } from '../../helpers/api';
import { Card } from '../Card/Card';
import './TabletsPage.scss';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      try {
        const loadedProduct = await getProducts();

        setTablets(loadedProduct
          .filter((product: Slide) => product.type === 'tablet'));
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
        <div className="TabletContainer">
          <h1 className="Tablet__Title">Tablets</h1>
          <span className="Tablet__Sum">
            {tablets.length}
            {' '}
            models
          </span>
          <div className="TabletWrap">
            {tablets.map(product => (
              <Card key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
