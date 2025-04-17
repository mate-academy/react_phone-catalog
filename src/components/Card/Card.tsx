/* eslint-disable max-len */
import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import { ButtonCard } from '../ButtonCard/ButtonCard';
import { ProductSpec } from '../ProductSpec';
import { ProductType } from '../../types/ProductType';
import { DeviceType } from '../../types/DeviceType';

type Props = {
  id: string | number;
  category: 'phones' | 'tablets' | 'accessories';
  name: string;
  image: string;
  price: number | undefined;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
};

export const Card: React.FC<Props> = ({
  id,
  category,
  name,
  image,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
}) => {
  const product: ProductType | DeviceType = {
    id,
    category,
    name,
    image,
    price: price ?? fullPrice,
    fullPrice,
    screen,
    capacity,
    ram,
    itemId: id.toString(),
    color: '',
    year: new Date().getFullYear(),
  };

  return (
    <div className="card">
      <Link className="card__top" to={`/${category}/${id}`}>
        <img src={image} alt={name} className="card__top-img" />

        <div className="card__top-text">
          <p className="card__top-text--name text text__body">{name}</p>

          {price === undefined ? (
            <h3 className="card__top-text--price text">${fullPrice}</h3>
          ) : (
            <div className="card__top-text--price-block">
              <h3 className="card__top-text--price text">${price}</h3>

              <p className="card__top-text--price card__top-text--price-discount text">
                ${fullPrice}
              </p>
            </div>
          )}
        </div>
      </Link>

      <ProductSpec
        screen={screen}
        capacity={capacity}
        ram={ram}
        details={false}
      />

      <ButtonCard details={false} product={product} />
    </div>
  );
};
