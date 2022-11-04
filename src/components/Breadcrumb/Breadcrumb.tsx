import { useLocation } from 'react-router-dom';

export const BreadCrumb = () => {
  const location = useLocation().pathname.split('/').filter(x => x);

  return (
    <nav
      className="breadcrumb has-arrow-separator"
      aria-label="breadcrumbs"
    >
      <ul className="is-flex is-align-items-center">
        <li>
          <a href="#0">
            <i
              className="fa-solid fa-house has-text-black"
              aria-hidden="true"
            />
          </a>
        </li>
        <li>
          <a href="#0" className="has-text-grey-light">
            {[location[0][0].toLocaleUpperCase(),
              ...location[0].split('').slice(1)]}
          </a>
        </li>
      </ul>
    </nav>
  );
};
