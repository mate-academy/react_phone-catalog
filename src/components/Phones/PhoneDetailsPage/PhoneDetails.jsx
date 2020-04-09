import React from 'react';
import { Preloader } from '../../Common/Preloader/Preloader';

export const PhoneDetails = (props) => {
  const { details } = props;

  if (!details) {
    return <Preloader />;
  }

  return (
    <>
      <h2>PhonesDetails</h2>
      <p>{details.id}</p>

    </>
  );
};
