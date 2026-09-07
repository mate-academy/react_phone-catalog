import { Link } from 'react-router-dom';
import s from './ShopByCategories.module.scss';
import { FC, useEffect, useState } from 'react';
import { CATEGORIES } from '../../../shared/constants';

interface CategoryData {
  path: string;
  name: string;
  title: string;
  imgSrc: string;
}

const categories: CategoryData[] = Object.values(CATEGORIES);

interface HomeCategoryProps {
  category: CategoryData;
  count: number;
}

const HomeCategory: FC<HomeCategoryProps> = ({ category, count }) => {
  return (
    <div className={s.homeCategory}>
      <Link to={`${category.path}`} className={s.categoryLink}>
        <img
          className={s.categoryImage}
          src={category.imgSrc}
          alt={category.title}
        />
        <div className={s.categoryInfo}>
          <p>{category.title}</p>
          <p className={s.categoryGreyText}>{count} models</p>
        </div>
      </Link>
    </div>
  );
};

export const ShopByCategories = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadCounts = async () => {
      const data = await Promise.all(
        categories.map(async category => {
          const response = await fetch(`api\\${category.path}.json`);
          const items = await response.json();

          return [category.name, items.length] as const;
        }),
      );

      setCounts(Object.fromEntries(data));
    };

    loadCounts();
  }, []);

  return (
    <div className={s.homeCategories}>
      <h2>Shop by category</h2>
      <div className={s.homeCategoriesGrid}>
        {categories.map(category => (
          <HomeCategory
            category={category}
            key={category.name}
            count={counts[category.name]}
          />
        ))}
      </div>
    </div>
  );
};
