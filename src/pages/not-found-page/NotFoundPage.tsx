import './styles.scss';

import { Link } from 'react-router-dom';
import { AppRoutes } from '../../libs/enums';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found">
      <div className="not-found__container">
        <h2>Oops!</h2>
        <p>Page not found.</p>
        <p>
          {'Please consider returning to the '}
          <Link to={AppRoutes.ROOT}>homepage</Link>
          {' for more options.'}
        </p>
      </div>
    </main>
  );
};
