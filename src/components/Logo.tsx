import React from 'react';
import { Link } from 'react-router-dom';

const path = process.env.PUBLIC_URL;
const image = '_new/img/icons/LOGO.svg';

type Props = {
  className: string;
};

export const Logo: React.FC<Props> = ({ className }) => (
  <Link
    to="/"
    className={className}
  >
    <img src={path + image} alt="logo" />
  </Link>
);
