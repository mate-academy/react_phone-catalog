import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './Logo.module.scss';
import logo from '../../images/logo/logo.svg';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link to="/" className={cn(styles.logo, className)}>
      <img src={logo} alt="Nice Gadget" className={cn(styles.logo__image)} />
    </Link>
  );
};
