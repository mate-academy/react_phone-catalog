type Category = 'phones' | 'tablets' | 'accessories';

export interface ProductDescriptionBlock {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: Category;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];

  // Present only for some products (like the iPad)
  camera?: string;
  zoom?: string;
}
