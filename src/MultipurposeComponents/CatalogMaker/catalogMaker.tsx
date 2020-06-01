import React, { FC } from 'react';
import { Phones } from '../../Additional/interfaces';
import { Card } from '../Card/Card';

type Params = {
  gadgets: Phones[];
  route: string;
};

export const CatalogMaker: FC<Params> = ({ gadgets, route }) => {
  return (
    <>
      {gadgets.map((phone: Phones) => (
        <Card phone={phone} route={route} />
      ))}
    </>
  );
};
