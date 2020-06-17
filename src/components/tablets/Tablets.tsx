import React from 'react';
import { useSelector } from 'react-redux';
import { getVisibleGoods } from '../../store';
import { Card } from '../card/Card';

type Props = { phones: Good[]};

const Tablets: React.FC<Props> = () => {
  const goods = useSelector(getVisibleGoods);

  return (
    <>
      <h1>Phones</h1>
      <div className="Card">
      <ul className="Card__list">
        {goods.map(good => <Card good={good} />)}
      </ul>
    </div>
    </>
  );
};
export default Tablets;
