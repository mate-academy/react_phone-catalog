import React, { useState, useEffect } from 'react';
import { IGood, getGoods } from '../../provider/dataFromApi';
import { GoodList } from '../goodList/GoodList';

type Props = { tablets: IGood[] }

const Tablets:React.FC<Props> = () => {

  const [tablets, setGoods] = useState<IGood[]>([]);
  useEffect(() => {
    getGoods()
      .then(data => {
        setGoods(data);
      });
  }, []);

  return (
    <>
    <h1> Tablets</h1>
      <GoodList goods = {tablets} />
    </>
  );
};

export default Tablets;
