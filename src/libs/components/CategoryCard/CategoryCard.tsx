import { Link } from 'react-router-dom';

import { CategoryName } from '../../types/categoryName.enum';
import { useAppSelector } from '../../app/hooks';
import {
  getProductCategory,
  getCategoryTitle,
} from '../../utils';

import './CategoryCard.scss';

type Props = {
  pass: CategoryName,
  title?: string
};

export const CategoryCard: React.FC<Props> = ({
  pass,
  title = getCategoryTitle(pass),
}) => {
  const { allProducts } = useAppSelector(store => store.products);

  const modelsCount = allProducts.filter(
    product => {
      const type = getProductCategory(pass);

      return product.type === type;
    },
  ).length;

  return (
    <Link
      to={pass}
      className="category-card"
      data-cy="categoryLinksContainer"
    >
      <img
        src={`./img/categories/${pass}-category.jpg`}
        alt={title}
        className="category-card__photo"
      />
      <div className="category-card__text-container">
        <h3
          className="category-card__title"
        >
          {title}
        </h3>
        <p
          className="category-card__models-count"
        >
          {`${modelsCount} models`}
        </p>
      </div>
    </Link>
  );
};
