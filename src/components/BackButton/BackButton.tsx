import { Link } from 'react-router-dom';

import './BackButton.scss';

export const BackButton = () => {
  return (
    <Link
      to=".."
      className="back-button text text--gray text--small"
    >
      <span className="icon icon--arrow icon--back" />
      Back
    </Link>
  );
};
