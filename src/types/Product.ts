export interface Product {
  id: number;
  category: Category;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: Capacity;
  color: string;
  ram: RAM;
  year: number;
  image: string;
  quantity?: number;
}

export enum Capacity {
  The128GB = '128GB',
  The1TB = '1TB',
  The256GB = '256GB',
  The2TB = '2TB',
  The32GB = '32GB',
  The38Mm = '38mm',
  The40Mm = '40mm',
  The42Mm = '42mm',
  The44Mm = '44mm',
  The512GB = '512GB',
  The64GB = '64GB',
}

export enum Category {
  Accessories = 'accessories',
  Phones = 'phones',
  Tablets = 'tablets',
}

export enum RAM {
  The075GB = '0.75GB',
  The1GB = '1GB',
  The2GB = '2GB',
  The3GB = '3GB',
  The4GB = '4GB',
  The6GB = '6GB',
  The768MB = '768MB',
  The8GB = '8GB',
}
