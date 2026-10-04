import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => (
  <Link
    to="/"
    className={cn(styles.logo, className)}
    aria-label="Nice Gadgets, home"
  >
    <span>
      NICE
      <span className={styles.emoji} aria-hidden="true">
        👌
      </span>
    </span>
    <span>GADGETS</span>
  </Link>
);
