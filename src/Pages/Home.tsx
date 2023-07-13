import React, { useEffect, useState } from 'react';

import { getProducts } from '../api/getData';

import { Phone } from '../type/Phone';

import { Slider } from '../components/Slider/Slider';
import { HotPrices } from '../components/HotPrices/HotPrices';
import { Categories } from '../components/Categories/Categories';
import { BrandNewModels } from '../components/BrandNewModels/BrandNewModels';

export const Home: React.FC = () => {
  const [list, setList] = useState<Phone[]>([]);

  const data = async () => {
    try {
      const res = await getProducts();

      setList(await res);
    } catch {
      throw new Error('Hello, Mario, HotPrices comp');
    }
  };

  useEffect(() => {
    data();
  }, []);

  const getHotPriceProducts = list.filter(element => (
    element.category === 'phones' && element.capacity.length > 0
  ));

  const getBrandNew = list.sort((elem1, elem2) => elem2.price - elem1.price);

  return (
    <div className="container">
      <Slider />
      <HotPrices list={getHotPriceProducts} />
      <Categories />
      <BrandNewModels
        list={getBrandNew}
      />
    </div>
  );
};
