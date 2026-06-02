import styles from './CategoryList.module.scss';
import { useEffect, useState } from 'react';
import { Phone } from '../../../../../types/Phone';
import { Accessory } from '../../../../../types/Accessory';
import { Tablet } from '../../../../../types/Tablet';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../../../../utils/api';
import { CategoryItemData } from '../../../../../types/CategoryItemData';
import { CategoryItem } from './components';

export const CategoryList = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  const categoryItems: CategoryItemData[] = [
    {
      title: 'Mobile phones',
      category: 'phones',
      imgSrc: '/img/category-phones-bgc.png',
      count: phones.length,
    },
    {
      title: 'Tablets',
      category: 'tablets',
      imgSrc: '/img/category-tablets-bgc.png',
      count: tablets.length,
    },
    {
      title: 'Accessories',
      category: 'accessories',
      imgSrc: '/img/category-accessories-bgc.png',
      count: accessories.length,
    },
  ];

  useEffect(() => {
    getPhones().then(phonesFromServer => setPhones(phonesFromServer));
    getTablets().then(tabletsFromServer => setTablets(tabletsFromServer));
    getAccessories().then(accessoriesFromServer =>
      setAccessories(accessoriesFromServer),
    );
  }, []);

  return (
    <div className={styles.categoryList}>
      {categoryItems.map(item => (
        <CategoryItem key={`category-${item.category}`} item={item} />
      ))}
    </div>
  );
};
