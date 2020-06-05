import React, { useContext, useEffect, useState } from 'react';
import './hotPrices.scss';

import { ProductSlider } from '../../MultipurposeComponents/ProductSlider/ProductSlider';
import { ServerData } from '../../Additional/additional_api';

export const HotPrices = () => {
  const [phones, setPhones] = useState([]);
  const dataFromServer = useContext(ServerData);

  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { discount: number }) => el
        .discount > 0)
      .sort((a: {price: number}, b: {price: number}) => b.price - a.price))
      .then(data => setPhones(data));
  }, [dataFromServer]);

  return (
    <ProductSlider phones={phones} title="Hot prices" />
  );
};
