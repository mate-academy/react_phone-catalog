import './AccessoriesPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getAccessories } from '../../api/api';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      const accessoriesFromApi = await getAccessories;

      setAccessories(accessoriesFromApi);
    };

    fetchAccessories();
  }, []);

  return (
    <>
      <ProductsList products={accessories} category="Accessories" />
    </>
  );
};
