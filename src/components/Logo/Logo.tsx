import logo from '@Images/logo.png';
import style from './logo.module.scss';

const Logo = () => {
  return (
    <a className={style.logo} href="">
      <img className={style.logo__img} src={logo} alt="" />
    </a>
  );
};

export default Logo;
