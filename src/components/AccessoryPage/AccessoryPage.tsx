import React from 'react';
import accessories from '../../../public/api/accessories.json';
import { ItemPage } from '../ItemPage/ItemPage';

export const AccessoryPage: React.FC = () => {
  return (
    <ItemPage
      categoryName="Accessories"
      items={accessories}
    />
  )
}
