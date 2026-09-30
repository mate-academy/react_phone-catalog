import React, { useState, useEffect } from 'react';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory: React.FC = () => {
  // стани для кількості товарів кожної категорії
  const [phonesCount, setPhonesCount] = useState<number>(0);
  const [tabletsCount, setTabletsCount] = useState<number>(0);
  const [accessoriesCount, setAccessoriesCount] = useState<number>(0);

  const categories = [
    {
      name: 'Mobile phones',
      image: 'img/category-phones.png',
      bgColor: '#3d3c3e',
      count: `${phonesCount} models`
    },
    {
      name: 'Tablets',
      image: 'img/category-tablets.png',
      bgColor: '#8C8C8C',
      count: `${tabletsCount} models`
    },
    {
      name: 'Accessories',
      image: 'img/category-accessories.png',
      bgColor: '#AE4554',
      count: `${accessoriesCount} models`
    },
  ];

  // завантаження даних та підрахунок довжини масивів
  useEffect(() => {
    const fetchCounts = async () => {
      try {
       const [phonesRes, tabletsRes, accessoriesRes] = await Promise.all([
          fetch('api/phones.json'),
          fetch('api/tablets.json'),
          fetch('api/accessories.json'),
        ]);

        const phonesData = await phonesRes.json();
        const tabletsData = await tabletsRes.json();
        const accessoriesData = await accessoriesRes.json();

        setPhonesCount(phonesData.length);
        setTabletsCount(tabletsData.length);
        setAccessoriesCount(accessoriesData.length);
      } catch (error) {
        console.error('Помилка при завантаженні кількості товарів', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Shop by Category</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <div key={category.name} className={styles.categoryCard}>
            {/* контейнер із фоном та зображенням поверх */}
            <div
              className={styles.imageWrapper}
              style={{ backgroundColor: category.bgColor }}
            >
              <img src={category.image} alt={category.name} className={styles.img} />
            </div>

            {/* тайтл та лічильник товарів */}
            <div className={styles.contentWrapper}>
              <span className={styles.title}>{category.name}</span>
              <h3>{category.count}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
