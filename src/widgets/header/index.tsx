import { Link } from 'react-router-dom';
import styles from './styles/header.module.scss';
import { HeaderButtonNavigation, HeaderMainNavigation } from './ui';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img
          src="/src/shared/icons/logo.svg"
          alt=""
          aria-hidden="true"
          className={styles['logo-image']}
        />
      </Link>
      <HeaderMainNavigation />
      <HeaderButtonNavigation />
    </header>
  );
};
