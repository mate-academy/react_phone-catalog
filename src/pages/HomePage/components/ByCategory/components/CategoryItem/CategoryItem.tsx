import { Link } from 'react-router-dom';

type Props = {
  category: string;
  imageSrc: string;
  title: string;
  count: number;
};

export const CategoryItem: React.FC<Props> = ({
  category,
  imageSrc,
  title,
  count,
}) => (
  <li className="by-category__item">
    <Link to={`${category}`} className="by-category__link">
      <div className="by-category__image-wrapper">
        <img src={imageSrc} alt={`${title} Category`} />
      </div>
      <h4 className="by-category__item-title">{title}</h4>
      <p className="by-category__count typography__body">{count || 0} models</p>
    </Link>
  </li>
);
