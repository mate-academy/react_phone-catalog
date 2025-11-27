import { Link } from 'react-router-dom';
import logo from '@Images/logo.png';
import style from './logo.module.scss';

const Logo = () => {
  return (
    <Link
      className={style.logo}
      onClick={() => {
        window.scrollTo({
          top: 0,
        });
      }}
      to={'/'}
    >
      <img className={style.logo__img} src={logo} alt="" />
    </Link>
  );
};

export default Logo;
