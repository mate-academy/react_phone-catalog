import { useContext, useMemo } from 'react';
import { MainContext } from '../../context/MainContext';
import { Category } from '../../types/Category';
import { CategoryCard } from './CategoryCard';

export const Categories = () => {
  const { phones, tablets, accessories } = useContext(MainContext);

  const getCategories: Category[] = useMemo(() => {
    return [
      {
        id: 0,
        path: 'phones',
        image: './img/category_1.jpg',
        title: 'Mobile phones',
        length: phones.length,
      },
      {
        id: 1,
        path: 'tablets',
        image: './img/category_2.jpg',
        title: 'Tablets',
        length: tablets.length,
      },
      {
        id: 2,
        path: 'accessories',
        image: './img/category_3.jpg',
        title: 'Accessories',
        length: accessories.length,
      },
    ];
  }, [phones, tablets, accessories]);

  return (
    <section className="section categories">
      <div className="section__container">
        <div className="categories__block">
          <div className="h1 categories__title">Shop by category</div>

          <div className="categories__cards">
            {getCategories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
