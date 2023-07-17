import { Link } from 'react-router-dom';

export const Logo: React.FC = () => (
  <Link to="/" className="logo">
    <img src="./img/Logo.svg" alt="logo" />
  </Link>
);
