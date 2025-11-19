export type Product = {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice?: any;
  price?: any;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image?: string;
  discount?: any;
  Accessory?: any;
  images?: string[];
  colorsAvailable?: string[];
  capacityAvailable?: string[];
  description?:{
    title: string;
    text: string[];
  }[];
  camera?: string;
  zoom?: string;
  cell?: string[];
  processor?: string;
  resolution?: string | number;
  priceRegular?: number;
  priceDiscount?: number;

};
