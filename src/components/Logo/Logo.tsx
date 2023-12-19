import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import './logo.scss';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo">
      <ReactSVG src="img/icons/Logo (1).svg" />
    </Link>
  );
};
