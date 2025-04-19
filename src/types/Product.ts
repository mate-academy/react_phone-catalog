export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  category?: string;
  phoneId?: string;
  color?: string;
  description?: string[];
  resolution?: string;
  processor?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

export interface ProductDetailed extends Product {
  images: string[];
  colors: string[];
  capacities: string[];
  description: string[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
  galleryImages?: string[];
}
