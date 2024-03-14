import { useEffect, useState } from 'react';
import './Categories.scss';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import { getAccessories, getTablets } from '../../api/api';
import { categoryImages } from '../../helpers/constants';
import { Category } from '../Category/Category';

export const Categories = () => {
  const { phones } = useAppSelector(state => state.phones);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);

  const otherProducts = async () => {
    try {
      const tabletsFromServer: Product[] = await getTablets();
      const accessFromServer: Product[] = await getAccessories();

      setTablets(tabletsFromServer);
      setAccessories(accessFromServer);
    } catch (error) {
      throw new Error('error');
    }
  };

  useEffect(() => {
    otherProducts();
  }, []);

  const modelsAmount = [phones.length, tablets.length, accessories.length];

  return (
    <div className="categories">
      <h1 className="categories__title title">Shop by category</h1>

      <div className="categories__categories">
        {categoryImages.map((img, i) => (
          <Category key={img} i={i} image={img} amount={modelsAmount[i]} />
        ))}
      </div>
    </div>
  );
};
