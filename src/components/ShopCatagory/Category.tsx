import React, { FC } from 'react';
import { ShopCatagory } from '../../types/ShopCategory';
import { Link } from 'react-router-dom';

type Props = {
  category: ShopCatagory;
};

export const Category: FC<Props> = ({ category }) => {
  const { linkTo, image, name, countModels } = category;
  return (
    <Link to={linkTo} className="shop-category__block">
      <img src={image} alt="" className="shop-category__image" />
      <h4 className="shop-category__name">{name}</h4>
      <div className="shop-category__count">{countModels} models</div>
    </Link>
  );
};
