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
        <React.Fragment key={phone.id}>
          <Card phone={phone} route={route} />
        </React.Fragment>
      ))}
    </>
  );
};
