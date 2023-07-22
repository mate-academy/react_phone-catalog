import React, { useEffect, useState } from 'react';

import { getProducts } from '../api/getData';

import { Products } from '../type/Products';

import { Slider } from '../components/Slider';
import { CatalogShortCut } from '../components/CatalogShortCut';
import { Categories } from '../components/Categories';

export const HomePage: React.FC = () => {
  const [list, setList] = useState<Products[]>([]);

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
      <CatalogShortCut
        title="Hot Price"
        list={getHotPriceProducts}
      />
      <Categories />
      <CatalogShortCut
        title="Brand New"
        list={getBrandNew}
      />
    </div>
  );
};
