import '../../styles/components/GoBackButton/GoBackButton.scss';

import { Link, useLocation } from 'react-router-dom';

export const GoBackButton = ({ ...props }) => {
  const location = useLocation();

  const link = location.state ? '..' : '/home';

  return (
    <Link
      to={link}
      className="go-back-button"
      {...props}
    >
      Back
    </Link>
  );
};
