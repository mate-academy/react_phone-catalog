import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './BreadCrumbs.scss';
import { getSearchParamsWith } from '../../helpers/searchParams';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const breadCrumbs = pathname.split('/').slice(1);

  return (
    <nav
      className="breadcrumbss"
      aria-label="breadcrumbss"
      data-cy="breadCrumbs"
    >
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item breadcrumbs__item--home">
          <NavLink
            to="/"
            className="breadcrumbs__link breadcrumbs__link--home"
          />
        </li>

        {breadCrumbs.map((el, i) => (
          <li
            className="breadcrumbs__item"
            key={el}
          >
            <NavLink
              to={i === breadCrumbs.length - 1
                ? {
                  pathname: '.',
                  search: getSearchParamsWith({}, searchParams),
                }
                : el}
              className="breadcrumbs__link"
            >
              {el}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
