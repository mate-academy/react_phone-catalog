import { Link } from 'react-router-dom';
import './CategoryCard.scss';

type Props = {
  title: string,
  img: string,
  to: string,
  qnty: number,
};

export const CategoryCard: React.FC<Props> = ({
  img,
  title,
  qnty,
  to,
}) => {
  return (
    <div className="category-card">
      <Link to={to}>
        <img src={img} alt="phones category" />
      </Link>

      <div>
        <Link to={to} className="category-card__title">
          {title}
        </Link>

        <p className="category-card__title-extra">
          {`${qnty} models`}
        </p>
      </div>
    </div>
  );
};
