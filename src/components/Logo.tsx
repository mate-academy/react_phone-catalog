import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src="assests/images/Logo.svg" alt="" />
    </Link>
  );
};
