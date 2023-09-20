import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchAccessories, fetchPhones, fetchTablets } from '../../api';

import './CategoryBanners.scss';

export const CategoryBanners = () => {
  const [phonesAmount, setPhonesAmount] = useState(0);
  const [tabletsAmount, setTabletsAmount] = useState(0);
  const [accessoriesAmount, setAccessoriesAmount] = useState(0);

  useEffect(() => {
    fetchPhones().then((res) => setPhonesAmount(res.length));
    fetchTablets().then((res) => setTabletsAmount(res.length));
    fetchAccessories().then((res) => setAccessoriesAmount(res.length));
  }, []);

  return (
    <div className="CategoryList">
      <h2 className="CategoryList__title">Shop by category</h2>

      <div
        className="CategoryList__links"
        data-cy="categoryLinksContainer"
      >
        <div className="CategoryLink">
          <NavLink
            to="/phones"
            className="CategoryLink__img CategoryLink__img--phones"
          >
            {' '}
          </NavLink>

          <NavLink
            to="/phones"
            className="CategoryLink__title"
          >
            Phones
          </NavLink>

          <p className="CategoryLink__amount">
            {`${phonesAmount} model${phonesAmount !== 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="CategoryLink">
          <NavLink
            to="/tablets"
            className="CategoryLink__img CategoryLink__img--tablets"
          >
            {' '}
          </NavLink>

          <NavLink
            to="/tablets"
            className="CategoryLink__title"
          >
            Tablets
          </NavLink>

          <p className="CategoryLink__amount">
            {`${tabletsAmount} model${tabletsAmount !== 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="CategoryLink">
          <NavLink
            to="/accessories"
            className="CategoryLink__img CategoryLink__img--accessories"
          >
            {' '}
          </NavLink>

          <NavLink
            to="/accessories"
            className="CategoryLink__title"
          >
            Accessories
          </NavLink>

          <p className="CategoryLink__amount">
            {`${accessoriesAmount} model${accessoriesAmount !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>
    </div>
  );
};
