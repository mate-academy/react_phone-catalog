import logo from '/img/logo/Logo.png';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <img src={logo} alt="logo" className={styles.logo_img} />
      </div>
    </Link>
  );
};
