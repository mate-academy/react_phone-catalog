import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Slider } from '../components/Slider';
import { CatalogProducts } from '../components/CatalogProducts';
import { Products } from '../type/Products';
import { getProducts } from '../api/getData';
import { Categories } from '../components/Categories';

export const Home: React.FC = () => {
  const [list, setList] = useState<Products[]>([]);

  const data = async () => {
    try {
      const res = await getProducts();

      setList(res);
    } catch {
      swal({
        icon: 'error',
        title: 'Something goes wrong!',
        text: 'Try in a few!',
      });
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
      <CatalogProducts list={getHotPriceProducts} title="Hot price" />
      <Categories />
      <CatalogProducts list={getBrandNew} title="Shop by category" />
    </div>
  );
};
