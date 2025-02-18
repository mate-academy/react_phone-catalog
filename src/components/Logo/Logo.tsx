import { Link } from 'react-router-dom';
import style from './Logo.module.scss';

const Logo = () => (
  <Link to="/" className={style.logo}>
    <img src="./img/logo.svg" alt="Logo" />
  </Link>
);

export default Logo;
