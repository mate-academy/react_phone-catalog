import { getData } from '@Fetch';
import style from './Category.module.scss';

import { useEffect, useState } from 'react';
import { images } from '.';
import { Products } from 'src/types/products';
import { CategoryCard } from '../CategoryCard/CategoryCard';

export const Category = () => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [tablets, setTablets] = useState<Products[]>([]);
  const [accessories, setAccessories] = useState<Products[]>([]);

  useEffect(() => {
    getData<Products[]>('/phones').then(res => {
      setPhones(res);
    });
    getData<Products[]>('/accessories').then(setAccessories);
    getData<Products[]>('/tablets').then(setTablets);
  }, []);

  const categoriesData = [
    {
      id: 1,
      path: 'phones',
      title: 'Mobile phones',
      count: phones.length,
      desktopImage: images.phoneDekstop,
      mobileImage: images.phoneMobile,
      className: style.phones,
    },
    {
      id: 2,
      path: 'tablets',
      title: 'Tablets',
      count: tablets.length,
      desktopImage: images.tableDekstop,
      mobileImage: images.tabletMobile,
      className: style.tablets,
    },
    {
      id: 3,
      path: 'accessories',
      title: 'Accessories',
      count: accessories.length,
      desktopImage: images.accessoryDekstop,
      mobileImage: images.accessoryMobile,
      className: style.accessories,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h1 className={`${style.title} title`}>Shop by category</h1>

        <div className={style.category}>
          {categoriesData.map(category => (
            <CategoryCard
              key={category.id}
              name={category.title}
              path={category.path}
              count={category.count}
              desktopImage={category.desktopImage}
              mobileImage={category.mobileImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
