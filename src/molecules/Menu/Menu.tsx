import Link from '@/atoms/Link';
import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <div className={styles.menu}>
      <Link to="/">Home</Link>
      <Link to="/phones">Phones</Link>
      <Link to="/tablets">Tablets</Link>
      <Link to="/accessories">Accessories</Link>
    </div>
  );
};

export default Menu;
