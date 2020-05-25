import React from 'react';

import './GoodsList.scss';
import { GoodItem } from './GoodItem';

interface Props {
  goods: Good[];
}

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <div className="GoodsList">
    {goods.map(good => (
      <GoodItem good={good} key={good.id} />
    ))}
  </div>
);
