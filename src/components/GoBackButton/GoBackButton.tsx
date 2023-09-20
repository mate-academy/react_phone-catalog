import '../../styles/components/GoBackButton/GoBackButton.scss';

import { Link } from 'react-router-dom';

export const GoBackButton = ({ ...props }) => {
  return (
    <Link to="/home" className="go-back-button" {...props}>
      Back
    </Link>
  );
};
