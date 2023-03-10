import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src="img/logo/Logo.svg" alt="logo" />
    </Link>
  );
};
