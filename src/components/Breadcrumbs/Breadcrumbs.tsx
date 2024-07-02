import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/').filter(part => part !== '');
  let currentPath = '';

  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to="/" className="breadcrumbs__link">
            <span className="icon icon--home"></span>
          </Link>
        </li>
        {pathParts.map((part, index) => {
          currentPath += '/' + part;
          const label = part.charAt(0).toUpperCase() + part.slice(1);
          const link = currentPath;

          return (
            <li key={index} className="breadcrumbs__item">
              <span className="icon icon__arrow-right--disabled" />
              <Link to={link} className="breadcrumbs__link">
                {label.split('-').join(' ')}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
