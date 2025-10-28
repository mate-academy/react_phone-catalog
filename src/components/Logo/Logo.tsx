import { BASE_URL } from '../../utils/variables/base';
import s from './Logo.module.scss';
import { Link, useLocation } from 'react-router-dom';

export const Logo = () => {
  const location = useLocation();

  return (
    <Link to="/" state={{ from: location.pathname }} className={s.logoLink}>
      Nice
      <img
        className={s.logoEmoji}
        src={`${BASE_URL}icons/title-emoji.svg`}
        alt="logo emoji"
      />
      <br />
      Gadgets
    </Link>
  );
};
