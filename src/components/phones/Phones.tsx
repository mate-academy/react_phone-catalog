import React from 'react';

import { useSelector } from 'react-redux';
import { GoodList } from '../goodList/GoodList';

import { getPhones } from '../../store';

type Props = { phones: Good[]};

const Phones: React.FC<Props> = () => {
  const goods = useSelector(getPhones);

  return (
    <>
      <h1>Phones</h1>
      <GoodList goods={goods} />
    </>
  );
};

export default Phones;
