import React, { FC } from 'react';
import { PhonesCatalog } from './PhonesCatalog';

export const PhonesPage: FC = () => {
  return (
    <div className="phones">
      <h1>
        Phones page
      </h1>
      <PhonesCatalog />
    </div>
  );
};
