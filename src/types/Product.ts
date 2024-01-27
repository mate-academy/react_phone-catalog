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

// {
//   "id": "apple-iphone-11-64gb-black",
// "namespaceId": "apple-iphone-11",
// "name": "Apple iPhone 11 64GB Black",
// "capacityAvailable": ["64GB", "128GB", "256GB"],
// "capacity": "64GB",
// "priceRegular": 932,
// "priceDiscount": 880,
// "colorsAvailable": ["black", "green", "yellow", "white", "purple", "red"],
// "color": "black",
// "images": [
//   "img/phones/apple-iphone-11/black/00.jpg",
//   "img/phones/apple-iphone-11/black/01.jpg",
//   "img/phones/apple-iphone-11/black/02.jpg",
//   "img/phones/apple-iphone-11/black/03.jpg",
//   "img/phones/apple-iphone-11/black/04.jpg"
// ],
// "description": [
//   {
//     "title": "And then there was Pro",
//     "text": [
//       "A transformative triple-camera system that adds tons of capability without complexity.",
//       "An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
//     ]
//   },
//   {
//     "title": "Camera",
//     "text": [
//       "Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it."
//     ]
//   },
//   {
//     "title": "Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.",
//     "text": [
//       "iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with."
//     ]
//   }
// ],
// "screen": "6.1' IPS",
// "resolution": "1792x828",
// "processor": "Apple A13 Bionic",
// "ram": "4GB",
// "camera": "12 Mp + 12 Mp + 12MP",
// "zoom": "Digital, 5x",
// "cell": ["GPRS", "EDGE", "WCDMA", "UMTS", "HSPA", "LTE"]
// }

export type ProductPrecise = {
  id: string;
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
};

export enum ProductCategory {
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export const capacityAvailableRegEx = /[0-9]{1,3}(?=gb)/gi;
