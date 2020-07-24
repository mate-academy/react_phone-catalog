/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPhones } from '../../store/index';
import { Phone } from '../../interfaces';
import { AddButton } from '../AddButton';
import { Price } from '../Price';
import { Options } from '../Options';

interface Props {
  info: string;
  description: string;
}

export const PhonesPage: React.FC<Props> = () => {
  const products: Phone[] = useSelector(getPhones);
  const phones = products.filter(product => product.type === 'phone');

  console.log(phones);

  return (
    <section className="phones">
      <h2 className="title">
        Mobile phones
      </h2>
      <p className="phones__number">{`${phones.length} models`}</p>
      <div className="phones__sorting">
        <div className="phones__wrapper">
          <p className="phones__sort-name">Sort by</p>
          <select className="phones__sort" name="sort-by" id="sort-by">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="phones__wrapper">
          <p className="phones__sort-name">Items on page</p>
          <select className="phones__sort" name="items-per-page" id="items-per-page">
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
      <ul className="phones__list">
        {
          phones.map(phone => {
            const generalDetails = [
              { title: 'Screen', option: phone.screen },
              { title: 'Ram', option: phone.ram },
              { title: 'Capacity', option: phone.capacity },
            ];

            return (
              <li className="carousel__item card">
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
          })
        }
      </ul>
    </section>
  );
};
