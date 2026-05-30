import React from 'react';
import styles from './Logo.module.scss';
import logo from '../../assets/img/tools/Logo.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  className?: string;
};

const Logo: React.FC<Props> = ({ className = '' }) => {
  return (
    <Link to="/" className={classNames(styles.logo, className)}>
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
