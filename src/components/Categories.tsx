import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  numberPhones: number;
  numberTablets: number;
  numberAccessories: number;

}

export const Categories: React.FC<Props> = ({ numberPhones, numberTablets, numberAccessories }) => {
  return (
    <div className="categories">
      <h2 className="categories__title">Shop by category</h2>
      <ul className="categories__list">
        <li className="categories__item">
          <NavLink to="/phones">
            <img src="../../img/images/home/phones.png" alt="" className="categories__img categories__img--phones"/>
            <p className="categories__name">Mobile phones</p>
          </NavLink>
            <p className="categories__number">{numberPhones}</p>
        </li>
        <li className="categories__item">
          <NavLink to="/tablets/">
            <img src="../../img/images/home/tablets.png" alt="" className="categories__img categories__img--tablets"/>
            <p className="categories__name">Tablets</p>
          </NavLink>
            <p className="categories__number">{numberTablets}</p>
        </li>
        <li className="categories__item">
          <NavLink to="/accessories/">
            <img src="../../img/images/home/accesories.png" alt="" className="categories__img categories__img--accessories"/>
            <p className="categories__name">Accesories</p>
          </NavLink>
            <p className="categories__number">{numberAccessories}</p>
        </li>
      </ul>
    </div>
  )
}
