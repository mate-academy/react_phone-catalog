import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import './BreadCrumbs.scss';
import { getSearchParamsWith } from '../../helpers/searchParams';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const breadCrumbs = pathname.split('/').slice(1);

  function getPath(el: string): string {
    const index = breadCrumbs.indexOf(el);

    return breadCrumbs.slice(0, index + 1).join('/');
  }

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
            {i === breadCrumbs.length - 1
              ? (
                <p className="breadcrumbs__link breadcrumbs__link--last">
                  {el}
                </p>
              )
              : (
                <NavLink
                  to={{
                    pathname: `/${getPath(el)}`,
                    search: getSearchParamsWith({}, searchParams),
                  }}
                  className="breadcrumbs__link"
                >
                  {el}
                </NavLink>
              )}

          </li>
        ))}
      </ul>
    </nav>
  );
};
