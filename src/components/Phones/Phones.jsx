import React from 'react';
import { Preloader } from '../Common/Preloader/Preloader';
import { PhonesCatalog } from './PhonesCatalog';

export const Phones = (props) => {
  const { phones, isFetching } = props;

  return (
    <>
      <h2>Phones</h2>
      {isFetching ? <Preloader /> : null}
      <PhonesCatalog phones={phones} />
    </>
  );
};
