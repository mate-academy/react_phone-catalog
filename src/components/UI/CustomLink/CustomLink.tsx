import { Link } from 'react-router-dom';
import React, { FC } from 'react';

type Props = {
  link: string;
  children: React.ReactNode;
};

export const CustomLink: FC<Props> = ({ link, children }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    {children}
  </Link>
);
