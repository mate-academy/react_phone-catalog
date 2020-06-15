import React from 'react';
import { useSelector } from 'react-redux';
import './HotPrice.scss';

import { Card } from '../card/Card';
import { getGoods } from '../../store';

const HotPrice = () => {
  const goods = useSelector(getGoods);

  return (
    <div>

      <div className="slider-btn-wrapper">
        <button type="button" className="btn-prev">prev</button>
        <button type="button" className="btn-next">next</button>
      </div>
      <div className="Card">
        <ul className="Card__list">
          {goods.filter(good => good.discount !== 0).map(good => <Card good={good} />)}
        </ul>
      </div>
    </div>
  );
};

export default HotPrice;
