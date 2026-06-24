import React from 'react';
import tablets from '../../../public/api/tablets.json';
import { ItemPage } from '../ItemPage/ItemPage';

export const TabletPage: React.FC = () => {
  return (
    <ItemPage
      categoryName="Tablets"
      items={tablets}
    />
  )
}
