import { Link } from 'react-router-dom';
import logo from '../../images/logo/logo.svg';

export const Logo = () => {
  return (
    <Link className="logo" to="/">
      <img className="logo__image" src={logo} alt="logo" />
    </Link>
  );
};
