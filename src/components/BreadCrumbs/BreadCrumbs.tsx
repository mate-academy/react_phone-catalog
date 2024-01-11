import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ICONS } from '../../icons';
import './BreadCrumbs.scss';

type Props = {
  page: string,
  productName?: string,
};

export const BreadCrumbs: React.FC<Props> = ({ page, productName }) => {
  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home">
        <img
          src={ICONS.iconHome}
          alt="Return to home page"
          className="breadcrumbs__home-image"
        />
      </Link>

      <div className="breadcrumbs__arrow" />

      <Link
        to={`/${page}`}
        className={classNames('breadcrumbs__title', {
          'breadcrumbs__title--target': productName,
        })}
      >
        {page}
      </Link>

      {productName && (
        <>
          <div className="breadcrumbs__arrow" />
          <p className="breadcrumbs__product-title">
            {productName}
          </p>
        </>
      )}
    </div>
  );
};
