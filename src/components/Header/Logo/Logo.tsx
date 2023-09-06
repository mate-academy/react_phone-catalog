import { Link } from 'react-router-dom';
import './Logo.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LogoImage from '../../../images/icons/LOGO.svg';

export const Logo = () => (
  <Link
    to="/"
    className="Logo"
  >
    <img
      src={LogoImage}
      alt="Logo"
      className="Logo--image"
    />
  </Link>
);
