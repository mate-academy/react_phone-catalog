import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Slider } from '../components/Slider';
import { HotPrice } from '../components/HotPrice';
import { Products } from '../type/Products';
import { getProducts } from '../api/getData';

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

  return (
    <div>
      <Slider />
      <HotPrice list={list} />
    </div>
  );
};
