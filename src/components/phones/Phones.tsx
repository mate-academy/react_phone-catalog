import React from 'react';

import { useSelector } from 'react-redux';
import { GoodList } from '../goodList/GoodList';

import { getGoods } from '../../store';

type Props = { phones: Good[]};

const Phones: React.FC<Props> = () => {
  const goods = useSelector(getGoods);
  const phones = goods.filter(good => good.type === 'phone');

  return (
    <>
      <h1>Phones</h1>
      <GoodList goods={phones} />
    </>
  );
};

export default Phones;
