import React from 'react';
import { useSelector } from 'react-redux';
import { GoodList } from '../goodList/GoodList';
import { getTablets } from '../../store';

const Tablets = () => {
  const goods = useSelector(getTablets);

  return (
    <>
      <h1> Tablets</h1>
      <GoodList goods={goods} />
    </>
  );
};

export default Tablets;
