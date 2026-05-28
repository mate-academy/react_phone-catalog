import { useEffect, useState } from 'react';
import { getAccessories, getPhones, getTablets } from '../../api/api';
import styles from './Categories.module.scss';
import { NavLink } from 'react-router-dom';

type Count = {
  phones: number;
  tablets: number;
  accessories: number;
};

type Category = {
  name: string;
  key: keyof Count;
  path: string;
  photo: string;
  photo2: string;
  color: string;
  fn: () => Promise<any>;
};

const CATEGORIES: Category[] = [
  {
    name: 'Mobile phones',
    path: '/phones',
    key: 'phones',
    fn: getPhones,
    photo: 'img/category-phones.webp',
    photo2: 'img/category-phones.png',
    color: '#383635',
  },
  {
    name: 'Tablets',
    path: '/tablets',
    key: 'tablets',
    fn: getTablets,
    photo: 'img/category-tablets.webp',
    photo2: 'img/category-tablets.png',
    color: '#8D8D92',
  },
  {
    name: 'Accessories',
    path: '/accessories',
    key: 'accessories',
    fn: getAccessories,
    photo: 'img/category-accessories.webp',
    photo2: 'img/category-accessories.png',
    color: '#973D5F',
  },
];

export const Categories = () => {
  const [count, setCount] = useState<Count>({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    CATEGORIES.forEach(({ fn, key }) => {
      fn()
        .then(data => {
          setCount(prev => ({
            ...prev,
            [key]: data.length,
          }));
        })
        .catch(() =>
          setCount(prev => ({
            ...prev,
            [key]: 0,
          })),
        );
    });
  }, []);

  return (
    <div className={styles.container}>
      {CATEGORIES.map(item => (
        <div className={styles.categories} key={item.key}>
          <NavLink to={item.path}>
            <div
              className={styles.imgBackground}
              style={{ backgroundColor: item.color }}
            >
              <picture>
                <source
                  srcSet={item.photo}
                  className={styles.photo}
                  type="image/webp"
                />
                <img
                  src={item.photo2}
                  alt={item.name}
                  className={styles.photo}
                />
              </picture>
            </div>
          </NavLink>

          <div className={styles.info}>
            <h4 className={styles.info__name}>{item.name}</h4>
            <p className={styles.info__number}>{`${count[item.key]} models`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
