import { Category } from '../../types/Category';

type Props = {
  category: Category;
};

export const CategoryTitle: React.FC<Props> = ({ category }) => {
  return (
    <article className="categoryTitle">
      <h1>{category.title}</h1>
      <span>{category.productsCount} models</span>
    </article>
  );
};
