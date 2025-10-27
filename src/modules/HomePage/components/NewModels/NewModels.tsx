import { Carusel } from '@GlobalComponents';
import { fetchProducts } from '@Fetch';

import { useEffect, useMemo, useState } from 'react';

import { Products } from 'src/types/products';

// import style from './NewModels.module.scss';

export const NewModels = () => {
  const [newModel, setNewModel] = useState<Products[]>([]);

  const newModels = useMemo(
    () => [
      'iPhone 14',
      'iPhone 14 pro',
      'Apple iPhone 13',
      'Apple iPhone 13 Pro',
      'Apple iPhone 13 Pro Max',
    ],
    [],
  );

  useEffect(() => {
    fetchProducts().then(products => {
      const filtered = products.filter(
        item =>
          item.category === 'phones' &&
          newModels.some(model => item.name.includes(model)),
      );

      const uniqueByColor = filtered.filter((item, index, arr) => {
        return arr.findIndex(el => el.color === item.color) === index;
      });

      setNewModel(
        uniqueByColor.sort(a => (a.name.includes('iPhone 13 Pro') ? -1 : 1)),
      );
    });
  }, [newModels]);

  return (
    <section className="section">
      <div className="container">
        <Carusel data={newModel} />
      </div>
    </section>
  );
};
