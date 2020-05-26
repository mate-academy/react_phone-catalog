import React, { useEffect, useState } from 'react';
import './hotPrices.scss';
import {
  downloadProducts,
} from '../../Additional/additional_api';
import { ProductSlider } from '../ProductSlider/ProductSlider';


export const HotPrices = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      return downloadProducts();
    }

    fetchData().then(data => data
      .filter((el: { discount: number }) => el
        .discount > 0)
      .sort((a: {price: number}, b: {price: number}) => b.price - a.price))
      .then(data => setPhones(data));
  }, []);


  return (
    <ProductSlider phones={phones} title="Hot prices" />
  );
};
