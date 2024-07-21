import './PhonesPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/api';
import { Loader } from '../../components/Loader';
import { AddButton } from '../../components/AddButton';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchPhones = () => {
    setIsLoading(true);
    setError(false);
    getPhones
      .then(phonesFromApi => {
        setPhones(phonesFromApi);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="container">
          <div className="page__title">Something went wrong...</div>
          <AddButton text="Reload" onClick={fetchPhones} />
        </div>
      ) : phones.length === 0 ? (
        <div className="page__title">There are no phones yet</div>
      ) : (
        <ProductsList products={phones} category="Phones" />
      )}
    </>
  );
};
