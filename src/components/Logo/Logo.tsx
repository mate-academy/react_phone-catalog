import React from 'react';
import './Logo.scss';
import { publicPath } from '../../utils/publicPath';

export const Logo: React.FC = () => {
  return (
    <img
      src={publicPath('/img/logo.svg')}
      alt="Nice Gadgets"
      className="logo"
    />
  );
};
