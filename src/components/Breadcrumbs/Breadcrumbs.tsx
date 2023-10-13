import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

type Props = {
  category: string,
  product?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ category, product }) => {
  return (
    <div className="Breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="Breadcrumbs__item Breadcrumbs__item--home" />

      {product ? (
        <>
          <Link to={`/${category}`} className="Breadcrumbs__item">{category}</Link>
          <p className="Breadcrumbs__item Breadcrumbs__item--text">{product}</p>
        </>
      ) : (
        <p className="Breadcrumbs__item Breadcrumbs__item--text">
          {category}
        </p>
      )}
    </div>
  );
};
