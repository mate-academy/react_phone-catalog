import React, { useContext } from 'react';
import { PathLink } from '../components/PathLink';
import '../styles/PhonesPage.scss';
import { GlobalContext } from '../GlobalContext';
import { Dropdowns } from '../components/Dropdowns';

export const PhonesPage: React.FC = () => {
  const { phones } = useContext(GlobalContext);

  return (
    <main className="PhonesPage">
      <PathLink />

      <h2 className="PhonesPage__title">
        Mobile phones
      </h2>

      <p className="PhonesPage__count">
        {`${phones.length} models`}
      </p>

      <Dropdowns />
    </main>
  );
};
