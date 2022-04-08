import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

// Styles
import './CategoryCard.scss';

type Props = {
  category: string;
  itemsCount: number;
};

export const CategoryCard: FunctionComponent<Props> = ({ category, itemsCount }) => {
  const lowerCategory = category.toLowerCase();

  return (
    <div className="CategoryCard">
      <Link to={lowerCategory}>
        <img
          src={`img/categories/${lowerCategory}.jpg`}
          alt={category}
          className="CategoryCard__image"
        />
      </Link>

      <h3 className="CategoryCard__title">
        {category === 'Phones' ? 'Mobile phones' : category}
      </h3>

      <p className="CategoryCard__modelsCount">
        {`${itemsCount} models`}
      </p>
    </div>
  );
};
