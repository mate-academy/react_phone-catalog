import { Link, useLocation, useParams } from 'react-router-dom';
import { useProducts } from '../../store/ProductsContext';

import arrow from '../../images/icons/arrow-right.svg';

import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { state, pathname } = useLocation();
  const { itemId } = useParams();

  const pathArray = pathname
    .replaceAll('/', ' ').trim().split(' ')
    .map(item => item[0].toUpperCase() + item.slice(1));

  const pathnameText = pathArray[0];
  const products = useProducts();
  const productName = products.find(item => item.itemId === itemId)?.name || '';

  return (
    <div
      className="breadcrumbs breadcrumbs__content"
      data-cy="breadCrumbs"
    >
      <Link
        to={{
          pathname: '/',
          search: state?.search,
        }}
        className="breadcrumbs__home button-icon button-icon--home"
      />

      {productName ? (
        <>
          <img
            src={arrow}
            alt="arrow-right"
            className="breadcrumbs__arrow"
          />

          <Link to=".." className="breadcrumbs__text breadcrumbs__text--link">
            {pathnameText}
          </Link>

          <img
            src={arrow}
            alt="arrow-right"
            className="breadcrumbs__arrow"
          />

          <p className="breadcrumbs__text">
            {productName}
          </p>
        </>
      ) : (
        <>
          <img
            src={arrow}
            alt="arrow-right"
            className="breadcrumbs__arrow"
          />

          <p className="breadcrumbs__text">
            {pathnameText}
          </p>
        </>
      )}
    </div>
  );
};
