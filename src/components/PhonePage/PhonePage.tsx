import React from 'react';
import phones from '../../../public/api/phones.json';
import { ItemPage } from '../ItemPage/ItemPage';

export const PhonePage: React.FC = () => {
  return (
    <ItemPage
      categoryName="Phones"
      items={phones}
    />
  )
}
