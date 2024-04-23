import { NavLink } from 'react-router-dom';
import './Breadcrumbs.scss';

type BreadcrumbsProps = {
  category: string;
  product?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category,
  product,
}) => {
  return (
    <div className="breadcrumbs">
      <NavLink to="/" className="breadcrumbs__home-icon" />
      <div className="breadcrumbs__arrow-icon"></div>
      {product ? (
        <NavLink
          to={`/${category}`}
          className="breadcrumbs__category breadcrumbs__category-link"
        >
          {category}
        </NavLink>
      ) : (
        <div className="breadcrumbs__category">{category}</div>
      )}
      {product && (
        <>
          <div className="breadcrumbs__arrow-icon"></div>
          <div className="breadcrumbs__product">{product}</div>
        </>
      )}
    </div>
  );
};
