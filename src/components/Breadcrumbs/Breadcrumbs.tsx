import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { NavLinks } from '../../types/NavLinks';
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
        {NavLinks[`${type}` as keyof typeof NavLinks] || 'favorites'}
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
