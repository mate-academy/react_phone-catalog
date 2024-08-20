import './TabletsPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getTablets } from '../../api/api';
import { Loader } from '../../components/Loader';
import { AddButton } from '../../components/AddButton';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchTablets = () => {
    setIsLoading(true);
    setError(false);
    getTablets
      .then(TabletsFromApi => {
        setTablets(TabletsFromApi);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="container">
          <div className="page__title">Something went wrong...</div>
          <AddButton text="Reload" onClick={fetchTablets} />
        </div>
      ) : tablets.length === 0 ? (
        <div className="page__title">There are no phones yet</div>
      ) : (
        <ProductsList products={tablets} category="Tablets" />
      )}
    </>
  );
};
