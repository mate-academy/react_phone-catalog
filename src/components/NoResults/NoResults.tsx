import { Link } from 'react-router-dom';
import './NoResults.scss';

export const NoResults: React.FC = () => {
  return (
    <div className="noResults">
      <h2 className="noResults__title">Ooops!</h2>

      <p
        className="noResults__message"
      >
        Accessories not found
      </p>

      <Link
        className="noResults__button"
        to="/"
      >
        Back to home page
      </Link>
    </div>
  );
};
