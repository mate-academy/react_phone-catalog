import { CategoryCard } from '../../types/Category';
import { CategoryItem } from '../CategoryItem';
import './style.scss';

type CategoryListProps = {
  categories: CategoryCard[]
};

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
}) => {
  return (
    <ul className="category">
      {categories.map(categoryItem => {
        return (
          <li key={categoryItem.link}>
            <CategoryItem category={categoryItem} />
          </li>
        );
      })}
    </ul>
  );
};
