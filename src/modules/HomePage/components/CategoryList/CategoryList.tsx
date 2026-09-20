import { CategoryItem } from '../CategoryItem';
import type { CategoryListType } from '../../types/CategoryListType';
import { useEffect, useState } from 'react';
import { CategoryData } from '../../types/CategoryData';

export const CategoryList = ({ filtredCategory }: CategoryListType) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const categoryList: CategoryData[] = Object.entries(filtredCategory).map(
      ([name, count], index) => ({
        name,
        count,
        image: `img/home/category/category${index}.jpg`,
      }),
    );

    setCategories(categoryList);
  }, [filtredCategory]);

  return (
    <>
      {categories.map((item, index) => (
        <CategoryItem
          key={index}
          name={item.name}
          total={item.count}
          img={item.image}
        />
      ))}
    </>
  );
};
