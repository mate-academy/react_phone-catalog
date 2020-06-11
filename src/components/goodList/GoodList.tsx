import React, { useState, useEffect } from 'react';
import { Card } from '../card/Card';
import './GoodList.scss';
import { IGood, getGoods } from '../../provider/dataFromApi';

type Props = { goods: IGood[] }

export const GoodList: React.FC<Props> = () => {

  const [goods, setGoods] = useState<IGood[]>([]);
  useEffect(() => {
    getGoods()
      .then(data => {
        setGoods(data);
      });
  }, []);
  return (
    <div >


      < Card goods={goods}/>
    </div>
  )
}
