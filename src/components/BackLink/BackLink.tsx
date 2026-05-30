import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { ProductsType } from '../../types/ProductsType';
import styles from './BackLink.module.scss';

type Props = Omit<LinkProps, 'to'> & {
  category?: ProductsType | '/';
};

export const BackLink = ({ category = '/', ...props }: Props) => {
  const location = useLocation();

  return (
    <Link
      to={location.state?.from || `/${category}`}
      className={`small-text ${styles['back-link']}`}
      {...props}
    >
      <span className="icon icon--arrow-left" />
      <p>Back</p>
    </Link>
  );
};
