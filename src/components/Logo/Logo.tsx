import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

export const Logo: React.FC = () => {
  return (
    <Link to="/" reloadDocument>
      <picture>
        <source srcSet="img/logo-desktop.svg" media="(min-width: 1024px)" />
        <source srcSet="img/logo-tablet.svg" media="(min-width: 576px)" />
        <img
          src="img/logo-mobile.svg"
          alt="The Nice Gadgets Logo"
          title="The Nice Gadgets Logo"
          className={styles.topBar__logo}
        />
      </picture>
    </Link>
  );
};
