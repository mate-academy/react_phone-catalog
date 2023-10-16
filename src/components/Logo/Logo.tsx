import { Link } from 'react-router-dom';
import LogoSVG from
  '../../assets/svg/thefreeforty_shop_icon-icons.com_66337.svg';
import './logo.scss';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src={LogoSVG} alt="logo" />
    </Link>
  );
};
