import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import styles from './Logo.module.scss';

type Props = {
  className?: string;
  variant?: 'default' | 'header';
};

const Logo = ({ className = '', variant = 'default' }: Props) => {
  return (
    <Link
      className={cn(styles.logo, className)}
      to="/"
      aria-label="Go to homepage"
    >
      <div
        className={cn(styles.logo__img, {
          [styles.logo__imgHeader]: variant === 'header',
        })}
      />
    </Link>
  );
};

export default Logo;
