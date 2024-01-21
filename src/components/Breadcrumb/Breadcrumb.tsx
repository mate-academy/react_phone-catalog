import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.scss';
import { useAppSelector } from '../../app/hooks';

export const Breadcrumb = () => {
  const { product } = useAppSelector(state => state.product);
  const { pathname } = useLocation();

  const correctPath = pathname.slice(1);
  const normalizedPathname = correctPath[0].toUpperCase()
    + correctPath.split('/')[0].slice(1);

  return (
    <div className="breadcrumb">
      <Link to="/">
        <div className="icon icon-home" />
      </Link>

      <div>
        <div className="icon icon-next-inactive" />
      </div>
      {product ? (
        <div className="breadcrumb__second">
          <Link
            to={`/${normalizedPathname.toLowerCase()}`}
            className="breadcrumb__name--active"
          >
            {normalizedPathname}
          </Link>

          <div className="breadcrumb__next">
            <div className="icon icon-next-inactive" />

            <p>{product.name}</p>
          </div>
        </div>
      ) : (
        <p className="breadcrumb__name--inactive">
          {normalizedPathname}
        </p>
      )}
    </div>
  );
};
