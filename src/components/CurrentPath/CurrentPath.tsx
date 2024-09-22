import { Link, useLocation } from 'react-router-dom';
import { GoToHome } from '../../utils/GoToHome';
import React from 'react';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';

type Props = {
  currentProduct?: Phone | Tablet | Accessory | undefined;
};

export const CurrentPath: React.FC<Props> = ({
  currentProduct = undefined,
}) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const slug = pathParts[pathParts.length - 1];
  const category = pathParts[pathParts.length - 2];

  return (
    <div className="product__path">
      <Link
        to="/"
        className="product__to-home product__path-item"
        onClick={GoToHome}
      ></Link>
      {!!category && (
        <Link to=".." className="product__to-category product__path-item">
          <span>{category}</span>
        </Link>
      )}
      <div className="product__slug product__path-item">
        <span>{!!category ? currentProduct?.name : slug}</span>
      </div>
    </div>
  );
};
