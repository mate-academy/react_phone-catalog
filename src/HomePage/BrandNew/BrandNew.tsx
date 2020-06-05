import React, { useContext, useEffect, useState } from 'react';
import { ServerData } from '../../Additional/additional_api';
import { ProductSlider } from '../../MultipurposeComponents/ProductSlider/ProductSlider';

export const BrandNew = () => {
  const [brandNew, setBrandNew] = useState([]);
  const dataFromServer = useContext(ServerData);

  useEffect(() => {
    dataFromServer.then(data => data
      .filter((el: { discount: number }) => el
        .discount === 0)
      .sort((a: {price: number}, b: {price: number}) => (b.price - a.price)))
      .then(data => setBrandNew(data));
  }, [dataFromServer]);

  return (
    <ProductSlider phones={brandNew} title="Brand new models" />
  );
};
