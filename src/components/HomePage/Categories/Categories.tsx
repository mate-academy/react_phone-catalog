import { Category } from '../../../features/types/Category';
import { CategoryCard } from '../../cards/CategoryCard';
import { SectionTitle } from '../../titles/SectionTitle';
import cl from './Categories.module.scss';

const categoriesMap: Category[] = [
  {
    img: '/img/categories/category-phones-mob.png',
    link: 'phones',
    name: 'Mobile phones',
    quantity: 42,
  },
  {
    img: '/img/categories/category-tablets-mob.png',
    link: 'tablets',
    name: 'Tablets',
    quantity: 42,
  },
  {
    img: '/img/categories/category-accessories-mob.png',
    link: 'accessories',
    name: 'Accessories',
    quantity: 42,
  },
];

export const Categories: React.FC = () => {
  return (
    <div className={cl.sectionContainer}>
      <SectionTitle text="Shop by category" />
      <ul className={cl.cardsList}>
        {categoriesMap.map(cat => (
          <li className={cl.cardsList__item} key={cat.name}>
            <CategoryCard category={cat} />
          </li>
        ))}
      </ul>
    </div>
  );
};
