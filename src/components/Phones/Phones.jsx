import React from 'react';
import './Phones.scss';
import { phonesPropType } from '../../propTypesConstants';

export const Phones = (props) => {
  const { phones } = props;

  return (
    <div className="content-heading">
      <h1 className="content-heading__title">Phone Catalog</h1>
      <p className="content-heading__count">{`${phones.length} models`}</p>
    </div>
  );
};

Phones.propTypes = {
  phones: phonesPropType.isRequired,
};
