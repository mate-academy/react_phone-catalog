import { Link, useLocation } from 'react-router-dom';
import { DetailProduct } from '../../types/DetailProduct';
import { Product } from '../../types/Product';
import './Breadcrumbs.scss';

type Props = {
  product?: Product | DetailProduct;
};

export const Breadcrumbs: React.FC<Props> = ({ product }) => {
  const location = useLocation();
  const path = location.pathname;

  const pathArray = path.split('/');
  const type = pathArray[1][0].toUpperCase() + pathArray[1].slice(1);

  return (
    <div
      className="page__breadcrumbs Breadcrumbs"
      data-cy="breadCrumbs"
    >
      <Link to="/" className="icon Breadcrumbs__home" />
      <div className="Breadcrumbs__path">
        <i className="icon icon--arrowRight" />
        {!product ? (
          <p className="Breadcrumbs__name">
            {type}
          </p>
        ) : (
          <Link
            to={`/${pathArray[1]}`}
            className="Breadcrumbs__link"
          >
            {type}
          </Link>
        )}
      </div>
      {product && (
        <div className="Breadcrumbs__path">
          <i className="icon icon--arrowRight" />
          <p className="Breadcrumbs__name">
            {product.name}
          </p>
        </div>
      )}
    </div>
  );
};
