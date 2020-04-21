import React, { FC } from 'react';
import { Phone } from './Phone/Phone';
import './PhonesList.scss';

interface Props {
  phones: Phone[];
}

export const PhonesList: FC<Props> = ({ phones }) => (
  <div className="phones">
    {phones.map(phone => (
      <Phone key={phone.id} phone={phone} />
    ))}
  </div>
);
