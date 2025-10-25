import { Carusel } from '@GlobalComponents';

import { useEffect, useState } from 'react';
import { Products } from 'src/types/products';

// import style from './NewModels.module.scss';

export const NewModels = () => {
  const [newModel, setNewModel] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('api/products.json');
        const data: Products[] = await res.json();

        setNewModel(
          data.filter(
            item =>
              (item.category === 'phones' && item.name.includes('iPhone 14')) ||
              item.name.includes('iPhone 14 pro'),
          ),
        );
      } catch {
        console.error('Erro Data');
      }
    };

    fetchData();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <Carusel data={newModel} />
      </div>
    </section>
  );
};
