import React from 'react';
import { GoodItem } from './GoodItem';
import { Basket } from '../interfaces';

interface Props {
  goodsList: Basket[];
}

export const GoodsList: React.FC<Props> = ({ goodsList }) => {

  return (
    <ul className="goods">
      {
        goodsList.map(goodItem => <GoodItem key={goodItem.id} goodItem={goodItem}/>)
      }
    </ul>
  );
}
