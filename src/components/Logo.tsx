import React from 'react';
import { Link } from 'react-router-dom';

const image
= 'img/icons/LOGO.svg';

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => (
  <Link
    to="/"
    className={className}
  >
    <img src={image} alt="logo" />
  </Link>
);
