import { Link } from 'react-router-dom';
import { Category } from '../../../types/Category';

interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => (
  <Link to={category.path} className="categories__card">
    <div className="categories__imgs">
      <picture>
        <img
          className="categories__img"
          src={category.image}
          alt={category.title}
          loading="lazy"
        />
      </picture>
    </div>

    <div className="categories__cont">
      <h3 className="h3 categories__subtitle">{category.title}</h3>
      <div className="text categories__text">{`${category.length} models`}</div>
    </div>
  </Link>
);
