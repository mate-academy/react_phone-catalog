import { useAppSelector } from '../../../app/hooks';
import { Category } from '../../../features/types/Category';
import { CategoryCard } from '../../cards/CategoryCard';
import { SectionTitle } from '../../titles/SectionTitle';
import cl from './Categories.module.scss';

const textContent = {
  title: {
    en: 'Shop by category',
    ua: 'Категорії товарів',
  },
  phones: {
    en: 'Mobile phones',
    ua: 'Мобільні телефони',
  },
  tablets: {
    en: 'Tablets',
    ua: 'Планшети',
  },
  accessories: {
    en: 'Accessories',
    ua: 'Аксесуари',
  },
};

const categoriesMap: Category[] = [
  {
    img: 'img/categories/category-phones-mob.png',
    link: 'phones',
    name: 'Mobile phones',
    quantity: 124,
  },
  {
    img: 'img/categories/category-tablets-mob.png',
    link: 'tablets',
    name: 'Tablets',
    quantity: 36,
  },
  {
    img: 'img/categories/category-accessories-mob.png',
    link: 'accessories',
    name: 'Accessories',
    quantity: 34,
  },
];

export const Categories: React.FC = () => {
  const { language } = useAppSelector(st => st.global);

  function getCategoriesName(category: Category) {
    switch (category.link) {
      case 'phones':
        return textContent.phones[language];
      case 'tablets':
        return textContent.tablets[language];
      case 'accessories':
        return textContent.accessories[language];
      default:
        return '';
    }
  }

  return (
    <div className={cl.sectionContainer}>
      <SectionTitle text={textContent.title[language]} />
      <ul className={cl.cardsList}>
        {categoriesMap.map(cat => (
          <li className={cl.cardsList__item} key={cat.link}>
            <CategoryCard category={cat} name={getCategoriesName(cat)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
