import { Link } from 'react-router-dom';
import LogoSVG from '../../assets/svg/fresh-apple-icon.svg';
import './logo.scss';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={LogoSVG} alt="logo" />
    </Link>
  );
};
