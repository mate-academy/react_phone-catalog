import { Link } from 'react-router-dom';
import './CategoryItem.scss';

type Props = {
  category: string,
  link: string,
  quantity?: number,
};

export const CategoryItem: React.FC<Props> = ({
  category,
  link,
  quantity = 0,
}) => {
  return (
    <div className="category">
      <Link
        to={`/${category}`}
        key={category}
      >
        <img
          className="category__img"
          alt={category}
          src={link}
        />
      </Link>
      <h3 className="category__title">
        {category === 'phones' ? 'Mobile phones' : category}
      </h3>
      <p className="category__quantity">{`${quantity} models`}</p>
    </div>
  );
};
