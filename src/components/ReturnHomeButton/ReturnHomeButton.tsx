import { Link } from 'react-router-dom';
import './ReturnHomeButton.scss';

export const ReturnHomeButton: React.FC = () => {
  return (
    <Link className="return-home-button" to="/">
      Return Home
    </Link>
  );
};
