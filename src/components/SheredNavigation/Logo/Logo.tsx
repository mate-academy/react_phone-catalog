import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../../public/img/Logo.png';
import styles from './Logo.module.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
  onClick?: () => void;
};
export const Logo: React.FC<Props> = ({ className, onClick }) => {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={classNames(styles.logo, className)}
    >
      <img src={logo} alt="NiceGadgets logo" />
    </Link>
  );
};
