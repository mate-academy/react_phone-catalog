import '../../styles/components/Crumbs/Crumbs.scss';

import { Link, useLocation } from 'react-router-dom';
import { getFormattedCrumb } from '../../utils/crumbFormat';

export const Crumbs: React.FC = () => {
  const { pathname } = useLocation();

  let path = '';

  const crumbs = pathname
    .split('/')
    .splice(1)
    .map((crumb, index, arr) => {
      path += `/${crumb}`;

      const formattedCrumb = getFormattedCrumb(crumb);

      return (
        <li key={crumb} className="crumbs__item">
          {index !== arr.length - 1 ? (
            <Link to={path}>
              {formattedCrumb}
            </Link>
          ) : formattedCrumb}
        </li>
      );
    });

  return (
    <div className="crumbs">
      <ul className="crumbs__list">
        <li className="crumbs__item">
          <Link to="/home" className="crumbs__home-icon" />
        </li>

        {crumbs}
      </ul>
    </div>
  );
};
