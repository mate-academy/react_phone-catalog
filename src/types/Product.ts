// export type Product = {
//   id: number;
//   category: 'phones' | 'tablets' | 'accessories';
//   itemId: string;
//   name: string;
//   capacity?: string;
//   fullPrice: number;
//   price: number;
//   color?: string;
//   image: string;
//   screen?: string;
//   ram?: string;
//   year: number;
// };

export type Product = {
  id: string; // 👈 ВАЖЛИВО: завжди string

  category: 'phones' | 'tablets' | 'accessories';

  itemId: string;

  name: string;

  capacity?: string;

  fullPrice: number;
  price: number;

  color?: string;
  image?: string;

  screen?: string;
  ram?: string;
  year?: number;

  // для детальних продуктів
  namespaceId?: string;
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  images?: string[];

  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];

  description?: {
    title: string;
    text: string[];
  }[];
};
