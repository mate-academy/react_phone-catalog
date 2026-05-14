export interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice?: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface ProductDescription {
  title?: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: ProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
}

type ProductDetailsWithoutId = Partial<Omit<ProductDetails, 'id' | 'description' | keyof Product>>;

export interface ProductWithDetails extends Product, ProductDetailsWithoutId {
  description?: ProductDetails['description'] | null;
}
