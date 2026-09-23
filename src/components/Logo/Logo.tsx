import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Logo.module.scss';

type Props = {
  className?: string;
};

export const Logo = ({ className }: Props) => (
  <Link to="/" className={cn(styles.logo, className)} aria-label="Nice Gadgets">
    <span className={styles.line}>Nice</span>
    <span className={styles.line}>
      Gadgets
      <span className={styles.hand}>👌</span>
    </span>
  </Link>
);
