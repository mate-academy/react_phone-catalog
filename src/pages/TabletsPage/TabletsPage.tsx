import './TabletsPage.scss';
import { ProductsList } from '../../components/ProductsList';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getTablets } from '../../api/api';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTablets = async () => {
      const tabletsFromApi = await getTablets;

      setTablets(tabletsFromApi);
    };

    fetchTablets();
  }, []);

  return (
    <>
      <ProductsList products={tablets} category="Tablets" />
    </>
  );
};
