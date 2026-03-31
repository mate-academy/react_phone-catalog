import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import s from './Logo.module.scss';

type Props = {
  className?: string;
  variant?: 'default' | 'header';
};

const Logo = ({ className = '', variant = 'default' }: Props) => {
  return (
    <Link className={cn(s.logo, className)} to="/" aria-label="Go to homepage">
      <div
        className={cn(s.logo__img, {
          [s.logo__imgHeader]: variant === 'header',
        })}
      />
    </Link>
  );
};

export default Logo;
