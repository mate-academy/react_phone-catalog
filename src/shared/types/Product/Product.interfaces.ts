export interface StoredProduct {
  productId: string;
  quantity: number;
}

export type ProductCategory = 'phones' | 'accessories' | 'tablets';

export type ProductCapacity = '64GB' | '128GB' | '256GB';

export type ProductCell = 'GPRS' | 'EDGE' | 'WCDMA' | 'UMTS' | 'HSPA' | 'LTE';

export type ProductColor =
  | 'black'
  | 'green'
  | 'yellow'
  | 'white'
  | 'purple'
  | 'red';

export interface ProductDescription {
  title: string;
  text: string[];
}
