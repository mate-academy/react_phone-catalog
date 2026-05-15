import { Link } from 'react-router-dom';
import LogoIcon from '../../modules/shared/assets/images/logo.svg?react';
import styles from './Logo.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <Link to="/" className={classNames(styles.logo, className)}>
      <LogoIcon className={styles.logoSvg} />
    </Link>
  );
};
