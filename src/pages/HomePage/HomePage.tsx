/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { NewItems } from '../../components/NewItems';
import { ShopPage } from '../../pages/ShopPage';

import './HomePage.scss';
import '../../styles/container.scss';
import phones from '../../api/api/phones.json';
import { Product } from '../../types';
import { MainSlider } from '../../components/MainSlider/MainSlider';

export const HomePage: React.FC = () => {
  const capacityOrder: Record<string, number> = {
    '1TB': 4,
    '512GB': 3,
    '256GB': 2,
    '128GB': 1,
  };

  const transformPhoneData = (phone: any): Product => ({
    id: phone.id,
    category: phone.category,
    itemId: phone.namespaceId || phone.id,
    name: phone.name,
    capacity: phone.capacity || 'Unknown',
    fullPrice: phone.priceRegular,
    price: phone.priceDiscount || phone.priceRegular,
    color: phone.color,
    images: phone.images,
    screen: phone.screen,
    ram: phone.ram,
    year: phone.year,
    priceRegular: phone.priceRegular,
    priceDiscount: phone.priceDiscount,
  });

  const iphone14Models: Product[] = phones
    .filter((phone: any) => phone.id.startsWith('apple-iphone-14-pro'))
    .map(transformPhoneData)
    .sort(
      (a, b) =>
        (capacityOrder[b.capacity] || 0) - (capacityOrder[a.capacity] || 0),
    );

  const hotPriceModels: Product[] = phones
    .filter((phone: any) => phone.priceRegular < 1000)
    .map(transformPhoneData);

  return (
    <div className="home">
      <div className="container">
        <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
        <MainSlider />
        <NewItems
          product={iphone14Models}
          title={'Brand new models'}
          showDiscount={false}
        />
        <ShopPage />
        <NewItems
          product={hotPriceModels}
          title={'Hot prices'}
          showDiscount={true}
        />
      </div>
    </div>
  );
};
