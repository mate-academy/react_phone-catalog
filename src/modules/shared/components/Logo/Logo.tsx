import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      NICE <img src="/public/img/hand-ok.svg" />
      <br />
      GADGETS
    </Link>
  );
};

export default Logo;
