export interface Product {
  year: number;
  id: string;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  image: string;

  // Pola szczegółowe (występują w plikach detali lub tabletach)
  priceRegular?: number;
  priceDiscount?: number;
  images?: string[];
  description?: { title: string; text: string[] }[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  namespaceId?: string;
}
