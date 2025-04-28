import React, { useEffect, useState } from 'react';
import { Hero } from '../../components/Hero';
import { NewModels } from '../../components/NewModels';
import { Category } from '../../components/Category';
import { HotPrices } from '../../components/HotPrices';

const HomePage: React.FC = () => {
  const [phonesTotal, setPhonesTotal] = useState(0);
  const [tabletsTotal, setTabletsTotal] = useState(0);
  const [accessoriesTotal, setAccessoriesTotal] = useState(0);

  const fetchProducts = async () => {
    try {
      const phonesRes = await fetch('api/phones.json');
      const phonesData = await phonesRes.json();

      const tabletsRes = await fetch('api/tablets.json');
      const tabletsData = await tabletsRes.json();

      const accessoriesRes = await fetch('api/accessories.json');
      const accessoriesData = await accessoriesRes.json();

      setPhonesTotal(phonesData.length - 1);
      setTabletsTotal(tabletsData.length - 1);
      setAccessoriesTotal(accessoriesData.length - 1);
    } catch (error) {
      throw new Error('Error fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <Hero />
      <NewModels />
      <Category
        phonesTotal={phonesTotal}
        tabletsTotal={tabletsTotal}
        accessoriesTotal={accessoriesTotal}
      />
      <HotPrices />
    </main>
  );
};

export default HomePage;
