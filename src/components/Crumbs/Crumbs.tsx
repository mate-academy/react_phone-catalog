import { Link, useLocation } from 'react-router-dom';
import { getFormattedCrumb } from '../../utils/getFormattedCrumb';
import './Crumbs.scss';

export const Crumbs = () => {
  const location = useLocation();

  let currentPath = '';

  const crumbs = location.pathname.split('/')
    .filter(crumb => !!crumb)
    .map((crumb, index, arr) => {
      currentPath += `/${crumb}`;

      const formattedCrumb = getFormattedCrumb(crumb);

      return (
        <li
          key={crumb}
          className="Crumbs__item"
        >
          {index !== arr.length - 1
            ? (
              <Link to={currentPath}>
                {formattedCrumb}
              </Link>
            )
            : formattedCrumb}
        </li>
      );
    });

  return (
    <div className="Crumbs" data-cy="crumbs">
      <ul className="Crumbs__list">
        <li>
          <Link
            to="/home"
            className="Crumbs__home-link"
          />
        </li>
        {crumbs}
      </ul>
    </div>
  );
};
