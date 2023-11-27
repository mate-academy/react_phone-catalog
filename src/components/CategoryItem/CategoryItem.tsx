import { Link } from 'react-router-dom';
import { CategoryCard } from '../../types/Category';
import './style.scss';

type CategoryItemProps = {
  category: CategoryCard,
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
}) => {
  const {
    link,
    backImageUrl,
    imageUrl,
    name,
    quantity,
  } = category;

  return (
    <div className="category__item">
      <Link to={link}>
        <div className="category__item-wrapper">
          <div
            style={{ backgroundImage: `url(${backImageUrl})` }}
            className="category__item-bg"
          />
          <img
            className="category__item-photo"
            src={`${imageUrl}`}
            alt={name}
          />
        </div>
      </Link>

      <div className="category__item-info">
        <Link to={link}>
          <h5 className="category__item-title title title--small">
            {name}
          </h5>
        </Link>
        <p className="category__item-quantity">
          {`${quantity} models`}
        </p>
      </div>
    </div>
  );
};
