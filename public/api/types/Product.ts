export interface Product {
  id?: string | number;
  name?: string;
  image?: string;
  [key: string]: unknown;
}
