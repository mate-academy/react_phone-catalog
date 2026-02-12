import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import styles from './Logo.module.scss';
import logo from '../../images/logo/logo.svg';
import logo_dark from '../../images/logo/Logo.png';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Link to="/" className={cn(styles.logo, className)}>
      <img
        src={theme === Theme.Light ? logo : logo_dark}
        alt="Nice Gadget"
        className={styles.logo__image}
      />
    </Link>
  );
};
