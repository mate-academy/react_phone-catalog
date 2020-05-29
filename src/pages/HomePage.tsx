import React, { useState, useEffect } from 'react';
import { Slider } from '../components/Slider/Slider';
import { PhonesSlider } from '../components/PhonesSlider/PhonesSlider';
import { Categories } from '../components/Categories/Categiries';
import { getPhones } from '../helpers/api';

export const HomePage = () => {
  const [phones, setPhones] = useState<Products[]>([]);


  useEffect(() => {
    getPhones().then(data => {
      setPhones(data);
    });
  }, []);

  console.log(phones);

  return (
    <>
      <Slider />
      <PhonesSlider title="Hot prices" />
      <Categories />
      <PhonesSlider title="Brand new models" />
    </>
  );
};
