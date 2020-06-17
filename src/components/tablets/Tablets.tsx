import React from 'react';
import { useSelector } from 'react-redux';
import { GoodList } from '../goodList/GoodList';
import { getGoods } from '../../store';

const Tablets = () => {
  const goods = useSelector(getGoods);
  const tablets = goods.filter(good => good.type === 'tablet');


  return (
    <>
      <h1> Tablets</h1>
      <GoodList goods={tablets} />
    </>
  );
};

export default Tablets;
