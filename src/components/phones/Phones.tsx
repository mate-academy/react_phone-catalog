import React, { useState, useEffect } from 'react';
import { IGood, getGoodsByCategory } from '../../provider/dataFromApi';
import { GoodList } from '../goodList/GoodList';

type Props = { phones: IGood[]};

const Phones: React.FC<Props> = () => {
  const [phones, setPhones] = useState<IGood[]>([]);

  useEffect(() => {
    getGoodsByCategory('phone')
      .then(data => {
        setPhones(data);
      });
  }, []);

  return (
    <>
      <h1>Phones</h1>
      <GoodList goods={phones} />
    </>
  );
};

export default Phones;
