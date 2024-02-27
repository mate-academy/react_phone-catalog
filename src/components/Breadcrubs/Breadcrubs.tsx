import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

type BreadcrubsProps = {
  productName?: string,
};

export const Breadcrumbs: React.FC<BreadcrubsProps> = ({
  productName,
}) => {
  const { pathname } = useLocation();
  const slicedPathname = pathname.split('/')[1];
  const pageLink = slicedPathname[0].toUpperCase() + slicedPathname.slice(1);

  return (
    <div
      className="breadcrumbs"
      data-cy="breadCrumbs"
    >
      <Link
        to="/"
        className="breadcrumbs__home"
      >
        <img
          src="_new/img/Home.svg"
          alt="breadcrumbs-home"
          className="breadcrumbs__home-picture"
        />
      </Link>

      <img
        src="_new/img/arrow-right.svg"
        alt="breadcrumbs-arrow"
        className="breadcrumbs__arrow"
      />

      <Link
        to={`/${slicedPathname}`}
        className={classNames(
          'breadcrumbs__link',
          productName
            ? 'breadcrumbs__link--on'
            : 'breadcrumbs__link--off',
        )}
        aria-disabled={productName?.length === 0}
      >
        {pageLink}
      </Link>

      {productName && (
        <>
          <img
            src="_new/img/arrow-right.svg"
            alt="breadcrumbs-arrow"
            className="breadcrumbs__arrow"
          />

          <span
            className={classNames(
              'breadcrumbs__link',
              'breadcrumbs__link--off',
            )}
          >
            {productName}
          </span>
        </>
      )}
    </div>
  );
};
