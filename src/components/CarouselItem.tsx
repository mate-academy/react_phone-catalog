import React from 'react';
import { Phone }  from '../interfaces';
import { NavLink } from 'react-router-dom';
import { AddButton } from './AddButton';


interface Props {
  phone: Phone;
  index: number;
  margin: number;
}

export const CarouselItem: React.FC<Props> = ({ phone, margin, index }) => {
  const left = (index === 0) ? margin : 0;
  return (
    <li style={{ marginLeft: left }}className="carousel__item card">
      <img className="card__img" src={phone.imageUrl} alt={phone.name} />
      <NavLink
        to={`phones/${phone.id}`}
      >
        <h3 className="card__title">{phone.name} {phone.capacity}</h3>
      </NavLink>

      <div className="card__price">
        <p className="card__price--old">&#x24;{phone.price}</p>
        <p className="card__price--new">&#x24;{+phone.price * (1 - +phone.discount / 100)}</p>
      </div>
      <div className="card__details details">
        <div className="details__item">
          <span className="details__option">Screen</span>
          <span className="details__value">{phone.screen}</span>
        </div>
        <div className="details__item">
          <span className="details__option">Capacity</span>
          <span className="details__value">{phone.capacity}</span>
        </div>
        <div className="details__item">
          <span className="details__option">RAM</span>
          <span className="details__value">{phone.ram}</span>
        </div>
      </div>
      <div className="card__button">
        <AddButton />
      </div>

    </li>
  )
}
