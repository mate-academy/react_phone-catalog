import { Link } from 'react-router-dom';
import logo from '@Images/logo.png';
import style from './logo.module.scss';

const Logo = () => {
  return (
    <Link className={style.logo} to={'/'}>
      <img className={style.logo__img} src={logo} alt="" />
    </Link>
  );
};

export default Logo;
