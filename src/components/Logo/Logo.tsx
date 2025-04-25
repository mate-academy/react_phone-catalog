import styles from './Logo.module.scss';
import logo from '../../../public/img/logo/Logo (3).png';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="" />
    </div>
  );
};

export default Logo;
