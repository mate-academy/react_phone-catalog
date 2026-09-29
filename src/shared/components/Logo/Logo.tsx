import { Link } from 'react-router-dom';
import { LogoImg } from '@/shared/assets/icons/logo';

import cn from 'classnames';
import './Logo.scss';

type Props = {
  className?: string;
};
export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link className={cn('logo', className)} to="/" aria-label="Home page">
      <LogoImg className="logo__img" />
    </Link>
  );
};
