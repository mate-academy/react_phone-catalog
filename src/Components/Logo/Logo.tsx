import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="logo">
      <img
        src="images/Logo.svg"
        alt="Logo"
        className="logo__img"
      />
    </Link>
  );
};
