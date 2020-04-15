import React from 'react';
import { phoneDetailsPropType } from '../../../propTypesConstants';
import { PageNotFound } from '../../PageNotFound/PageNotFound';

export const PhoneDetails = (props) => {
  const { details } = props;

  if (details === null) {
    return null;
  }

  if (details === undefined) {
    return <PageNotFound />;
  }

  return (
    <>
      <h2>PhonesDetails</h2>
      <img src={details.images[0]} alt="motorola-xoom" />
      <p>{details.id}</p>

    </>
  );
};

PhoneDetails.propTypes = {
  details: phoneDetailsPropType.isRequired,
};
