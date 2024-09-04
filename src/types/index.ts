/* eslint-disable no-console */
export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export type Phone = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  serialNumber?: number;
};
// export type Goods = {
//   id: string;
//   serialNumber?: number;
//   category: string;
//   namespaceId: string;
//   name: string;
//   capacityAvailable: string[];
//   capacity: string;
//   priceRegular: number;
//   priceDiscount: number;
//   colorsAvailable: string[];
//   color: string;
//   images: string[];
//   description: {
//     title: string;
//     text: string[];
//   }[];
//   screen: string;
//   resolution: string;
//   processor: string;
//   ram: string;
//   camera: string;
//   zoom: string;
//   cell: string[];
// };


// interface BaseProduct {
//   id: string;
//   // category: string;
//   namespaceId: string;
//   name: string;
//   capacityAvailable: string[];
//   capacity: string;
//   priceRegular: number;
//   priceDiscount: number;
//   colorsAvailable: string[];
//   color: string;
//   images: string[];
//   description: {
//     title: string;
//     text: string[];
//   }[];
//   screen: string;
//   resolution: string;
//   processor: string;
//   ram: string;
//   camera: string;
//   zoom: string;
//   cell: string[];
//   serialNumber?: number;
// }


export interface Phones extends Phone {
  category: 'phones';
}


export interface Accessories extends Phone {
  category: 'accessories';
}


export interface Tablets extends Phone {
  category: 'tablets';
}

export type Goods = Phones | Accessories | Tablets;



