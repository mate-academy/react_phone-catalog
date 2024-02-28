import React from 'react';
import './Logo.scss';

type Props = {};

export const Logo: React.FC<Props> = () => {
  return (
    <div className="logo">
      <img src="./img/logo.png" alt="Phone and Accessories Catalog" />
    </div>
  );
};
