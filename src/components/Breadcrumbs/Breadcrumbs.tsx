import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

type Props = {
  category: string;
  product?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category, product }) => (
  <div className="breadcrumbs">
    <Link to="/" className="breadcrumbs__home icon icon--home" />
    <div className="breadcrumbs__arrow icon" />
    {product ? (
      <>
        <Link to={`/${category}`} className="breadcrumbs__link">
          {category[0].toUpperCase() + category.slice(1)}
        </Link>
        <div className="breadcrumbs__arrow icon" />
        <span className="breadcrumbs__text">{product}</span>
      </>
    ) : (
      <span className="breadcrumbs__text">
        {category[0].toUpperCase() + category.slice(1)}
      </span>
    )}
  </div>
);
