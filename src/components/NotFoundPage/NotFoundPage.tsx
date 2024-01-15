import { Link } from 'react-router-dom';

import './NotFoundPage.scss';
import { useContext } from 'react';
import { PageContext } from '../../utils/GlobalContext';

type Props = {
  message?: string,
};

export const NotFoundPage: React.FC<Props> = ({
  message = 'Page not found',
}) => {
  const { setError } = useContext(PageContext);

  return (
    <div className="error-page">
      <div className="error-page__body">
        <p className="error-page__message">
          {message}
        </p>

        <Link
          to="/home"
          className="error-page__home-link"
          onClick={() => setError(false)}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};
