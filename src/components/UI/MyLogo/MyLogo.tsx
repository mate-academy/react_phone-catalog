import { Link } from 'react-router-dom';
import './MyLogo.scss';

export const MyLogo = () => {
  return (
    <Link to="/" className="logo">
      <img src="img/logo.png" alt="logo" />
    </Link>
  );
};
