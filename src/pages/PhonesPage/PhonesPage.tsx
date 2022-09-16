import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { NoResults } from '../../components/NoResults';

import { getAllPhones } from '../../api/api';

import './PhonesPage.scss';
import '../../styles/PageNav.scss';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  const setActive = (
    { isActive }: { isActive: boolean },
  ) => (isActive ? 'PageNav__link PageNav__link--isActive' : 'PageNav__link');

  useEffect(() => {
    ((async () => {
      const allPhonesFromServer = await getAllPhones();

      setPhones(allPhonesFromServer);
    }))();
  }, []);

  return (
    <div className="PhonesPage container">
      <div className="PageNav__nav">
        <NavLink className="PageNav__link" to="/">
          <i className="icon-Home PageNav__icon" />
        </NavLink>
        <i className="icon-Chevron-Arrow-Right PageNav__arrow" />
        <NavLink to="/phones" className={setActive}>Phones</NavLink>
      </div>
      <h2 className="PhonesPage__title">Mobile phones</h2>
      <span
        className="PhonesPage__subTitle"
      >
        {phones.length}
        {' '}
        models
      </span>
      {phones.length !== 0
        ? <ProductsList devices={phones} />
        : <NoResults title="Phones" />}
    </div>
  );
};
