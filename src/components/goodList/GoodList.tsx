import React from 'react';
import { Card } from '../card/Card';

type Props = { goods: Good[] };

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <div className="Card">
      <ul className="Card__list">
        {goods.map(good => <Card good={good} />)}
      </ul>
    </div>
  );
};
