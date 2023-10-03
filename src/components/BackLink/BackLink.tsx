import { Link, useNavigate } from 'react-router-dom';

import {
  ReactComponent as ArrowLeft,
} from '../../images/icons/arrow_left_dark.svg';

export const BackLink = () => {
  const navigate = useNavigate();

  const handleBackLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Link
      data-cy="backButton"
      className="back-link"
      to="#/"
      onClick={handleBackLink}
    >
      <ArrowLeft />
      <span className="back-label">
        Back
      </span>
    </Link>
  );
};
