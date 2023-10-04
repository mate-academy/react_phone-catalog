import { Link } from 'react-router-dom';
import './CategoryItem.scss';

type Props = {
  category: string,
  link: string,
  quantity: number,
};

export const CategoryItem: React.FC<Props> = ({
  category,
  link,
  quantity,
}) => (
  <div className="category-item">
    <Link
      to={`/${category}`}
      key={category}
    >
      <img
        className="category-item__img"
        alt={category}
        src={link}
      />
    </Link>

    <h3 className="category-item__title">
      {category === 'phones' ? 'Mobile phones' : category}
    </h3>

    <p className="category-item__quantity">
      {`${quantity} items`}
    </p>
  </div>
);
