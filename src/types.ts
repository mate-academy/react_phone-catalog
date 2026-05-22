export interface Products {
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
}

export interface ProductDetails extends Products {
  images: string;
  namespaceId: string;
  description: [title: string, text: string];
  colorsAvailable: [string];
  capacityAvailable: [string];
}
