export interface Product {
  id: number;
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
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}
