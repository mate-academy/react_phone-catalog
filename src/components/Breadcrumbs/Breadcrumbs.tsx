import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { transformType } from '../../helpers/different';
import './Breadcrumbs.scss';

type Props = {
  type: string,
  productName?: string,
};

export const Breadcrumbs: React.FC<Props> = ({ type, productName }) => {
  return (
    <div
      className="breadcrumbs"
      data-cy="breadCrumbs"
    >
      <Link
        to="/"
        className="breadcrumbs__home-link"
      >
        <img src="icons/home.svg" alt="home" />
      </Link>

      <img
        src="icons/arrow.svg"
        alt="arrow"
        className="breadcrumbs__arrow"
      />
      <p
        className={classNames(
          'breadcrumbs__title',
          { 'breadcrumbs__title--selected': !productName },
        )}
      >
        {transformType(type)}
      </p>

      {productName && (
        <>
          <img
            src="icons/arrow.svg"
            alt="arrow"
            className="breadcrumbs__arrow"
          />

          <p
            className={classNames(
              'breadcrumbs__title',
              { 'breadcrumbs__title--selected': productName },
            )}
          >
            {productName}
          </p>
        </>
      )}
    </div>
  );
};
