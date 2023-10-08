import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { getCorrectTitle } from '../../helpers/getCorrectTittle';
import arrowRight from '../../Images/Icons/ArrowRight.svg';
import home from '../../Images/Icons/Home.svg';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathSegment = pathname.split('/').filter(segment => segment !== '');
  const breadcrumbs = pathSegment.map((segment, index) => {
    const link = `/${pathSegment.slice(0, index + 1).join('/')}`;

    return { label: segment, link };
  });

  return (
    <nav className="breadcrumbs">
      <Link
        className="breadcrumbs__home-lenk"
        to="/"
      >
        <img
          src={home}
          alt="Home Link"
        />
      </Link>
      <div className="breadcrumbs__list">
        <ul className="breadcrumbs__list">
          {breadcrumbs.map((breadcrumb, index) => {
            const title = getCorrectTitle(breadcrumb.label);

            return (
              <li
                key={breadcrumb.label}
                className="breadcrumbs__item"
              >
                <img
                  src={arrowRight}
                  alt="arrow right"
                  className="breadcrumbs__arrow"
                />
                <Link
                  to={breadcrumb.link}
                  className={classNames('breadcrumbs__link', {
                    'breadcrumbs__link--active':
                      index === breadcrumbs.length - 1,
                  })}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
