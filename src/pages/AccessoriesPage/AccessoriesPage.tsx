import './AccessoriesPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getAccessories } from '../../api/api';
import { Loader } from '../../components/Loader';
import { AddButton } from '../../components/AddButton';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchAccessories = () => {
    setIsLoading(true);
    setError(false);
    getAccessories
      .then(accessoriesFromApi => {
        setAccessories(accessoriesFromApi);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="container">
          <div className="page__title">Something went wrong...</div>
          <AddButton text="Reload" onClick={fetchAccessories} />
        </div>
      ) : accessories.length === 0 ? (
        <div className="page__title">There are no phones yet</div>
      ) : (
        <ProductsList products={accessories} category="Accessories" />
      )}
    </>
  );
};
