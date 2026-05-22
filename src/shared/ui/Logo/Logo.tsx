import LogoSvg from '@/assets/images/logo/logo.svg?react';
import './Logo.scss';
import { Link } from 'react-router-dom';

type Props = Omit<React.ComponentProps<typeof Link>, 'to'> & {
  to?: string;
};

export const Logo: React.FC<Props> = ({ to = '/', ...props }: Props) => {
  return (
    <Link {...props} to={to} className="logo">
      <LogoSvg className="logo__svg" />
    </Link>
  );
};
