import React, { FC } from 'react';
import { Phone } from '../../Additional/interfaces';
import { Card } from '../Card/Card';

type Params = {
  gadgets: Phone[];
};

export const CatalogMaker: FC<Params> = ({ gadgets }) => {
  return (
    <>
      {gadgets?.map((phone: Phone) => (
          <Card phone={phone} key={phone.id}/>
      ))}
    </>
  );
};
