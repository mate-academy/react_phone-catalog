// import { Accessory } from './Accessory';
// import { Phone } from './Phone';
// import { Tablet } from './Tablet';

// export type Product = Phone | Tablet | Accessory;
export type Product = {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  capacity?: string;
  fullPrice: number;
  price: number;
  color?: string;
  image: string;
  screen?: string;
  ram?: string;
  year: number;
};
