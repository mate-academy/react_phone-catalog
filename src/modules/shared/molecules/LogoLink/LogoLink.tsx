import React from 'react';
import styles from './LogoLink.module.scss';
import { NavLink } from 'react-router-dom';
import { HeaderLogo } from '../../../../assets/icons/header-logo-icon';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const LogoLink: React.FC<Props> = ({ className }) => {
  return (
    <NavLink to="/" className={classNames(styles.logo, className)}>
      <HeaderLogo className={styles.logoImage} />
    </NavLink>
  );
};
