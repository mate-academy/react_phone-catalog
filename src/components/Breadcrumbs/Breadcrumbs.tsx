import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import classNames from 'classnames';
import home from '../../images/Icons/Home.svg';
import arrowRight from '../../images/Icons/button_arrow_right.svg';
import { getCorrectTitle } from '../../helpers/getCorrectTitle';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const pastnameSegments = pathname.split('/')
    .filter(segment => segment !== '');

  const breadcrumbs = pastnameSegments.map((segment, index) => {
    const link = `/${pastnameSegments.slice(0, index + 1).join('/')}`;

    return { label: segment, link };
  });

  return (
    <nav className="breadcrumbs">
      <Link
        className="breadcrumbs__home-link"
        to="/"
      >
        <img src={home} alt="Home link" />
      </Link>

      <div>
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
                  className={classNames('breadcrumbs__link',
                    {
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
