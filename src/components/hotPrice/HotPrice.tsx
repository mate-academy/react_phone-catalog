import React from 'react';

import { Card } from '../card/Card';
import { IGood } from '../../provider/dataFromApi';

import "./HotPrice.scss";

type Props = { goods: IGood[] }

const HotPrice: React.FC<Props> = ({ goods }) => {

  return (
    <div>

      <div className="slider-btn-wrapper">
        <button type="button" className="btn-prev">prev</button>
        <button type="button" className="btn-next">next</button>
      </div>
      <div className="Card">
      <ul className="Card__list">
        {goods.map(good =>
          < Card good={good} />)}
      </ul>
    </div>
    </div>
  );
};

export default HotPrice;
