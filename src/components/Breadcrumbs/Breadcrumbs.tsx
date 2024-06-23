import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathElements = location.pathname.split('/').slice(1);
  const productType = pathElements[0];
  const productId = pathElements[1];

  return (
    <nav className="breadcrumbs">
      <ol className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link
            to={'/'}
            className="breadcrumbs__link breadcrumbs__link--to--home"
          ></Link>
        </li>

        <li className="breadcrumbs__item">
          <Link
            to={'..'}
            relative="path"
            className={classNames('breadcrumbs__link', {
              disabled: pathElements.length === 1,
            })}
          >
            {productType}
          </Link>
        </li>

        {productId && (
          <li className="breadcrumbs__item">
            <Link
              to={'..'}
              relative="path"
              className="breadcrumbs__link disabled"
            >
              {productId.split('-').join(' ')}
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );
};
