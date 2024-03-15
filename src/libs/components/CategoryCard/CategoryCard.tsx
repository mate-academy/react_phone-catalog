import { Link } from 'react-router-dom';

import { ProductCategory } from '../../types';
import { useAppSelector } from '../../app/hooks';
import {
  getCategoryTitle,
} from '../../utils';

import './CategoryCard.scss';

type Props = {
  pass: ProductCategory,
  title?: string
};

export const CategoryCard: React.FC<Props> = ({
  pass,
  title = getCategoryTitle(pass),
}) => {
  const { allProducts } = useAppSelector(store => store.products);

  const modelsCount = allProducts
    .filter(product => product.category === pass)
    .length;

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
