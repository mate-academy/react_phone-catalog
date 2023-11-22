import { Link } from 'react-router-dom';

export const Logo: React.FC = () => (
  <Link to="/">
    <img
      src="./img/icons/logo.svg"
      alt="logo"
    />
  </Link>
);
