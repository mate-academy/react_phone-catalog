import { Link } from 'react-router-dom';
import './Error.scss';

export const Error: React.FC = () => {
  return (
    <div className="error">
      <h2 className="error__title">Ooops!</h2>

      <p
        className="error__message"
      >
        Something went wrong!
      </p>

      <Link
        className="error__button"
        to="/"
      >
        Back to home page
      </Link>
    </div>
  );
};
