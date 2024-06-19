import React, { useEffect, useState } from 'react';
import { Slider } from './components/Slider/Slider';
import './HomePage.scss';
import { Phone } from './components/Phones/Phone';
import { Categories } from './components/Category/Categories';
import { HotPrices } from './components/HotPrices/HotPrices';
import { ProductType } from '../../types/ProductType';
import { BASE_URL } from '../../utils/vars';

export const HomePage: React.FC = () => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [tablets, setTablets] = useState<ProductType[]>([]);
  const [accessories, setAccessories] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${BASE_URL}/api/products.json`);
      const data: ProductType[] = await response.json();

      const phonesData = data.filter(
        (product: ProductType) => product.category === 'phones',
      );
      const tabletsData = data.filter(
        (product: ProductType) => product.category === 'tablets',
      );
      const accessoriesData = data.filter(
        (product: ProductType) => product.category === 'accessories',
      );

      setPhones(phonesData);
      localStorage.setItem('phones', JSON.stringify(phonesData));
      setTablets(tabletsData);
      localStorage.setItem('tablets', JSON.stringify(tabletsData));
      setAccessories(accessoriesData);
      localStorage.setItem('accessories', JSON.stringify(accessoriesData));
    };

    const isValidStoredData = (data: string | null) => {
      return data && JSON.parse(data).length > 0;
    };

    const storedPhones = localStorage.getItem('phones');
    const storedTablets = localStorage.getItem('tablets');
    const storedAccessories = localStorage.getItem('accessories');

    if (
      isValidStoredData(storedPhones) &&
      isValidStoredData(storedTablets) &&
      isValidStoredData(storedAccessories)
    ) {
      setPhones(JSON.parse(storedPhones as string));
      setTablets(JSON.parse(storedTablets as string));
      setAccessories(JSON.parse(storedAccessories as string));
    } else {
      fetchData();
    }
  }, []);

  return (
    <section className="home">
      <h1 className="home__title container">Welcome to Nice Gadgets store!</h1>
      <Slider />
      <Phone />
      <Categories
        phoneLength={phones.length}
        tabletsLength={tablets.length}
        accessoriesLength={accessories.length}
      />
      <HotPrices title={'Hot prices'} />
    </section>
  );
};
