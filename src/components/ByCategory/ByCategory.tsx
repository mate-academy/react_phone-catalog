import React from 'react';
import { NavLink } from 'react-router-dom';
import './ByCategory.scss';

type Props = {
  phonesCount: number;
  tabletCount: number;
  accessoriesCount: number;
};

const ByCategoty: React.FC<Props> = (
  {
    phonesCount,
    tabletCount,
    accessoriesCount,
  },
) => {
  return (
    <section className="byCategory">
      <h2 className="byCategory__title">Shop by category</h2>
      <ul className="byCategory__list">

        <li className="byCategory__item">
          <NavLink className="byCategory__link" to="/phones">
            <div
              className="byCategory__link-container
              byCategory__link-container--1"
            >
              <img
                src="../../img/category/Phones_11.png"
                alt="categoty"
                className="byCategory__img"
              />
            </div>

            <h4 className="byCategory__subtitle">Mobile phones</h4>
          </NavLink>
          <span className="byCategory__info">
            {`${phonesCount} models`}
          </span>
        </li>

        <li className="byCategory__item">
          <NavLink className="byCategory__link" to="/tablets">
            <div
              className="byCategory__link-container
              byCategory__link-container--2"
            >
              <img
                src="../../img/category/Phones_22.png"
                alt="categoty"
                className="byCategory__img"
              />
            </div>

            <h4 className="byCategory__subtitle">Tablets</h4>
          </NavLink>
          <span className="byCategory__info">
            {`${tabletCount} models`}
          </span>
        </li>

        <li className="byCategory__item">
          <NavLink className="byCategory__link" to="/accessory">
            <div
              className="byCategory__link-container
              byCategory__link-container--3"
            >
              <img
                src="../../img/category/Phones_33.png"
                alt="categoty"
                className="byCategory__img"
              />
            </div>

            <h4 className="byCategory__subtitle">Accessories</h4>
          </NavLink>
          <span className="byCategory__info">
            {`${accessoriesCount} models`}
          </span>
        </li>
      </ul>
    </section>
  );
};

export default ByCategoty;
