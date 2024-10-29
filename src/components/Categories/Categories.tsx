// eslint-disable-next-line
// @ts-nocheck
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import phonesFromServer from '../../api/phones.json';
import './Categories.scss';
import './Categories__Tablet.scss';
import './Categories__Phone.scss';
import { PhoneFromServer } from '../../types/Phone';

export const Categories = () => {
  const [phones, setPhones] = useState<PhoneFromServer | []>([]);

  useEffect(() => {
    setPhones(phonesFromServer);
  }, []);

  return (
    <div className="categories">
      <div className="subtitle categories__subtitle">Shop by category</div>
      <ul className="categories__cards cards">
        <li className="cards__item category-item">
          <NavLink classname="category-link" to="/phones">
            <div className="category-item__img category-item__phones"></div>
            <p className="category-item__title">Mobile phones</p>
            <p className="category-item__models-count">
              {phones.length} models
            </p>
          </NavLink>
        </li>
        <li className="cards__item category-item">
          <NavLink classname="category-link" to="/tablets">
            <div className="category-item__img category-item__tablets"></div>
            <p className="category-item__title">Tablets</p>
            <p className="category-item__models-count">
              {phones.length} models
            </p>
          </NavLink>
        </li>
        <li className="cards__item category-item">
          <NavLink classname="category-link" to="/accessories">
            <div className="category-item__img category-item__accessories" />
            <p className="category-item__title">Accessories</p>
            <p className="category-item__models-count">
              {phones.length} models
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
