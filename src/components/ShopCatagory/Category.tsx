import React, { FC } from 'react';
import { ShopCatagoryType } from '../../types/ShopCategory';
import { Link } from 'react-router-dom';

type Props = {
  category: ShopCatagoryType;
};

export const Category: FC<Props> = ({ category }) => {
  const { id, image, name, numbers } = category;

  return (
    <Link to={id} className="shop-category__block">
      <img src={image} alt="" className="shop-category__image" />
      <h4 className="shop-category__name">{name}</h4>
      <div className="shop-category__count">{numbers} models</div>
    </Link>
  );
};
