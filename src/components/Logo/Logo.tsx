import { Link } from 'react-router-dom';
import './Logo.scss';
import React from 'react';

type Props = {
  placement: 'header' | 'footer';
};

export const Logo: React.FC<Props> = ({ placement }) => (
  <Link to="/" className={`logo logo--placement--${placement}`} />
);
