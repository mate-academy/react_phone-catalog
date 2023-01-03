import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs = () => {
  const location = useLocation();

  const categoryLink = location.pathname.split('/')[1];
  const productLink = location.pathname.split('/')[2];

  return (
    <nav
      data-cy="breadCrumbs"
      className="breadcrumbs"
    >

      <Link
        to="/"
        className="breadcrumbs__link"
      >
        <img
          className="breadcrumbs__img"
          src="/img/icons/home.png"
          alt="home"
        />

      </Link>

      <Link
        to={`/${categoryLink}`}
        className={classNames('breadcrumbs__link', {
          // eslint-disable-next-line max-len
          'breadcrumbs__link-isActive': categoryLink === location.pathname.slice(1),
        })}
      >
        <img
          className="breadcrumbs__img"
          src="/img/icons/ArrowRight.png"
          alt="home"
        />

        {categoryLink}
      </Link>

      {productLink && (
        <Link
          to={location.pathname}
          className={classNames('breadcrumbs__link', {
            'breadcrumbs__link-isActive': location.pathname,
          })}
        >
          <img
            className="breadcrumbs__img"
            src="/img/icons/ArrowRight.png"
            alt="home"
          />

          {productLink}
        </Link>
      )}

    </nav>
  );
};
