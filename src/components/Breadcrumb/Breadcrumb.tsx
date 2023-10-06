import { Link, useLocation } from 'react-router-dom';

export const BreadCrumb = () => {
  const location = useLocation().pathname.split('/').filter(x => x);

  const breadcrumbItem = (item: string) => item.split('-').map(
    x => (x[0].toLocaleUpperCase() + x.slice(1)),
  ).join(' ');

  return (
    <nav
      className="breadcrumb has-arrow-separator"
      aria-label="breadcrumbs"
    >
      <ul className="is-flex is-align-items-center">
        <li>
          <Link to="/">
            <i
              className="fa-solid fa-house has-text-black"
              aria-hidden="true"
            />
          </Link>
        </li>
        {location.map(item => (
          <li key={item}>
            <Link to={`/${item}`} className="has-text-grey-light">
              {breadcrumbItem(item)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
