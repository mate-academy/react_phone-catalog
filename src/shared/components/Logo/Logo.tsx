import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => (
  <Link to={'/'} className={className}>
    <img src="img/icons/logo.svg" alt="Logo" className={styles.logo} />
  </Link>
);
