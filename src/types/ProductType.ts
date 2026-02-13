import detailPhonesArray from '../../public/api/phones.json';
import detailTabletsArray from '../../public/api/tablets.json';
import detailAccessecoriesArray from '../../public/api/accessories.json';

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
  totalCount?: number;
};

export enum ProductEnum {
  'screen' = 'Screen',
  'resolution' = 'Resolution',
  'processor' = 'Processor',
  'capacity' = 'Capacity',
  'ram' = 'RAM',
  'camera' = 'Camera',
  'zoom' = 'Zoom',
  'cell' = 'Cell',
  'built in memory' = 'Built in memory',
}

export type DetailProductType =
  | (typeof detailPhonesArray)[0]
  | (typeof detailTabletsArray)[0]
  | (typeof detailAccessecoriesArray)[0];
