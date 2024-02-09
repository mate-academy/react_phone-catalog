import { Link, useLocation } from 'react-router-dom';
import './ButtonBack.scss';

export const ButtonBack = () => {
  const { state } = useLocation();

  return (
    <Link
      data-cy="backButton"
      className="ButtonBack"
      to={{
        pathname: '..',
        search: state?.search,
      }}
    >
      <span className="ButtonBack__back-text">
        Back
      </span>
    </Link>
  );
};
