import { Link } from 'react-router-dom';
import './Button.scss';

export const Button = () => {
  return (
    <div className="button-block">
      <button
        type="button"
        className="button-block__button"
      >
        <Link
          to="/"
          className="button-block__link"
        >
          Go Home
        </Link>
      </button>
    </div>
  );
};
