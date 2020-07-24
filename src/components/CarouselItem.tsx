import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone } from '../interfaces';
import { AddButton } from './AddButton';
import { Options } from './Options';
import { Price } from './Price';

interface Props {
  phone: Phone;
  index: number;
  margin: number;
}

export const CarouselItem: React.FC<Props> = ({ phone, margin, index }) => {
  const left = (index === 0) ? margin : 0;
  const generalDetails = [
    { title: 'Screen', option: phone.screen },
    { title: 'Ram', option: phone.ram },
    { title: 'Capacity', option: phone.capacity },
  ];

  return (
    <li style={{ marginLeft: left }} className="carousel__item card">
      <img className="card__img" src={phone.imageUrl} alt={phone.name} />
      <NavLink to={`phones/${phone.id}`}>
        <h3 className="card__title">
          {phone.name}
          {phone.capacity}
        </h3>
      </NavLink>
      <Price price={phone.price} discount={phone.discount} />
      <div className="card__details details">
        <Options optionsList={generalDetails} />
      </div>
      <div className="card__button">
        <AddButton goodItem={phone} />
      </div>
    </li>
  );
};
