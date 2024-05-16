import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathParts = pathname.split('/').filter(part => part !== '');
  let currentPath = '';

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {pathParts.map((part, index) => {
          currentPath += '/' + part;
          const label = part.charAt(0).toUpperCase() + part.slice(1);
          const link = currentPath;

          return (
            <li key={index} className="breadcrumbs__item">
              <Link to={link} className="breadcrumbs__link">
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
