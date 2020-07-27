import React from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../interfaces';
import { AddButton } from './ItemCard/AddButton';
import { Options } from './ItemCard/Options';
import { Price } from './ItemCard/Price';

interface Props {
  product: Product;
  index?: number;
  margin?: number;
  path: string;
}

export const ProductPreview: React.FC<Props> = ({
  product, margin, index, path,
}) => {
  const left = (index === 0) ? margin : 0;
  const generalDetails = [
    { title: 'Screen', option: product.screen },
    { title: 'Ram', option: product.ram },
    { title: 'Capacity', option: product.capacity },
  ];

  return (
    <li style={{ marginLeft: left }} className="carousel__item card">
      <img className="card__img" src={product.imageUrl} alt={product.name} />
      <NavLink to={`${path}${product.id}`}>
        <h3 className="card__title">
          {product.name}
          {product.capacity}
        </h3>
      </NavLink>
      <Price price={product.price} discount={product.discount} />
      <div className="card__details details">
        <Options optionsList={generalDetails} />
      </div>
      <div className="card__button">
        <AddButton goodItem={product} />
      </div>
    </li>
  );
};
