import LogoSvg from '@/assets/images/logo/logo.svg?react';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = Omit<React.ComponentProps<typeof Link>, 'to'> & {
  to?: string;
  type: 'Header' | 'Footer';
};

export const Logo: React.FC<Props> = ({ type, to = '/', className, ...props }: Props) => {
  return (
    <Link {...props} to={to} className={classNames(styles[`logo${type}`], styles.logo, className)}>
      <LogoSvg role="img" aria-label="Logo link to home page" className={styles.logoSvg} />
    </Link>
  );
};
