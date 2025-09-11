import logo from '/img/logo/Logo.png';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="logo" className={styles.logo_img} />
    </div>
  );
};
