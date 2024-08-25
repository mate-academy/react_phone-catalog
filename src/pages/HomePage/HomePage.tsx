/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MainSlider } from '../../components/MainSlider';
import { NewItems } from '../../components/NewItems';
import './HomePage.scss';
import '../../styles/container.scss';
import phones from '../../api/phones.json';


export const HomePage: React.FC = () => {
  const capacityOrder: Record<string, number> = {
    '1TB': 4,
    '512GB': 3,
    '256GB': 2,
    '128GB': 1,
  };

  const transformPhoneData = (phone: any) => ({
    ...phone,
    capacity: Array.isArray(phone.capacity) ? phone.capacity : [phone.capacity],
  });

  const iphone14Models = phones

    .filter((phone: any) => phone.id.startsWith('apple-iphone-14-pro'))
    .map(transformPhoneData)
    .sort(
      (a, b) =>
        (capacityOrder[b.capacity[0]] || 0) - (capacityOrder[a.capacity[0]] || 0),
    );

  return (
    <div className="home">
      <div className="container">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
        <MainSlider />
        <NewItems iphone={iphone14Models} title={'Brand new models'} showDiscount={false}/>
      </div>
    </div>
  );
};
