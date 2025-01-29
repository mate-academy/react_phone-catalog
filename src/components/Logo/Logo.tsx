import React from 'react';
import { Link } from 'react-router-dom';
import style from './Logo.module.scss';
import cn from 'classnames';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => (
  <Link className={cn(`${className} ${style.logo}`)} to={'/'}>
    <img
      src="img/logo.svg"
      alt="Nice Gaggets Logo"
      className={style.logo__image}
    />
  </Link>
);
