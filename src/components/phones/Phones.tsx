import React from 'react';
import { useSelector } from 'react-redux';

// import { GoodList } from '../goodList/GoodList';

import { getVisibleGoods } from '../../store';
import { Card } from '../card/Card';

type Props = { phones: Good[] };

const Phones: React.FC<Props> = () => {

  const goods = useSelector(getVisibleGoods);
  const goods = goods.filter(good => good.type === 'phone');
      
  return (
    <>
      <h1>Phones</h1>

<!--       <GoodList goods={phones} /> -->
      <div className="Card">
        <ul className="Card__list">
          {goods.map(good => <Card good={good} />)}
        </ul>
      </div>
    </>
  );
};

export default Phones;
