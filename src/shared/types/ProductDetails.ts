export type Description = {
  title: string;
  text: string;
};

export type ProductDetails = {
  id: string;
  namespace_id: string;
  name: string;
  capacity_available: string[];
  capacity: string;
  price_regular: number;
  price_discount: number;
  colors_available: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
};
