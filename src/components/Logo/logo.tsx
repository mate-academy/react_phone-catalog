import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <img src="img/logo.svg" alt="logo" className="logo" />
    </Link>
  );
};
