import { Link } from 'react-router-dom';
import themeStyles from '../../styles/utils/themeStyles';
import { ResponsiveHeader } from '../ResponsiveHeader';

import './PageNotFound.scss';

export const PageNotFound = () => {
  const { notFoundPage } = themeStyles(true);

  return (
    <div className="page-not-found">
      <ResponsiveHeader>Page not found!</ResponsiveHeader>

      <Link to={'/'}>
        <button className="error-page-button">Go home</button>
      </Link>

      <img src={notFoundPage} alt="Not Found Page" />
    </div>
  );
};
