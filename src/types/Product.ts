// {
//   "id": "1",
//   "category": "phones",
//   "phoneId": "apple-iphone-7-32gb-black",
//   "itemId": "apple-iphone-7-32gb-black",
//   "name": "Apple iPhone 7 32GB Black",
//   "fullPrice": 400,
//   "price": 375,
//   "screen": "4.7' IPS",
//   "capacity": "32GB",
//   "color": "black",
//   "ram": "2GB",
//   "year": 2016,
//   "image": "img/phones/apple-iphone-7/black/00.jpg"
// },

export type Product = {
  id: string;
  category: string;
  phoneId: string;
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

// export type ProductFetched = {
//   id: string;
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

export enum ProductCategory {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}
