import './PhonesPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/api';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPhones = async () => {
      const phonesFromApi = await getPhones;

      setPhones(phonesFromApi);
    };

    fetchPhones();
  }, []);

  return (
    <>
      <ProductsList products={phones} category="Phones" />
    </>
  );
};
