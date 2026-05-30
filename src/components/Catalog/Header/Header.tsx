import React from 'react';
import { Phones } from '../../../types/Phones';
import './Header.scss';
import { Products } from '../../../types/Products';
import { Accessories } from '../../../types/Accessories';
import { Tablets } from '../../../types/Tablets';

type Props = {
  location: string;
  product: Phones[] | Products[] | Accessories[] | Tablets[];
};

export const Header: React.FC<Props> = ({ location, product }) => {
  return (
    <div className="header">
      <h1 className="header__title">{location}</h1>
      <p className="header__counts">{product.length} models</p>
    </div>
  );
};
