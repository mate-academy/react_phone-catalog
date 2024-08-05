import { Link } from 'react-router-dom';
import './Breadcrumps.scss';
import { ProductContext } from '../Context/Context';
import { useContext } from 'react';

export const Breadcrumps = () => {
  const { path } = useContext(ProductContext);
  const paths = path.slice(1).split('/');
  const category = paths[0];
  const productId = paths[1];

  return (
    <div className="breadcrumps">
      <Link to="/" className="breadcrumps__home"></Link>

      {category && (
        <Link to={`/${category}`} className="breadcrumps__link">
          {category[0].toUpperCase() + category.slice(1)}
        </Link>
      )}
      {productId && (
        <p className="breadcrups__id">
          {productId[0].toUpperCase() + productId.slice(1)}
        </p>
      )}
    </div>
  );
};
