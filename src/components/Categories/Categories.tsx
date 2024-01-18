import { useEffect, useState } from 'react';
import './Categories.scss';
import { useAppSelector } from '../../app/hooks';
import { getAccessories, getTablets } from '../../api/api';
import { Product } from '../../types/Product';
import { Category } from '../Category';
import { categoryImages } from '../../helpers/constants';

export const Categories = () => {
  const { phones } = useAppSelector(state => state.phones);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessoroies, setAccessoroies] = useState<Product[]>([]);

  // just to have correct numbers (without creating of new slicers)
  const otherProducts = async () => {
    try {
      const tabletsFromServer: Product[] = await getTablets();
      const accessFromServer: Product[] = await getAccessories();

      setTablets(tabletsFromServer);
      setAccessoroies(accessFromServer);
    } catch (error) {
      throw new Error('error');
    }
  };

  useEffect(() => {
    otherProducts();
  }, []);

  const modelsAmount = [
    phones.length,
    tablets.length,
    accessoroies.length,
  ];

  return (
    <div className="categories">
      <h1 className="categories__title title">
        Shop by category
      </h1>

      <div className="categories__categories">
        {categoryImages.map((image, i) => (
          <Category
            key={image}
            i={i}
            image={image}
            amount={modelsAmount[i]}
          />
        ))}
      </div>
    </div>
  );
};
