export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  price: number;
  fullPrice: number;
  priceRegular: number;
  priceDiscount: number;
  screen?: string;
  capacity: string;
  color: string;
  ram?: string;
  year?: number;
  image: string;
  namespaceId?: string;
  images?: string[];
  colorsAvailable: string[];
  capacityAvailable: string[];
  resolution?: string;
  processor?: string;
};
// Тип для products.json (список товарів, картки)
