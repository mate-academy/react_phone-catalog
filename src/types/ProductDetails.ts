interface ProductDescription {
  map(
    arg0: (
      desc: { title: string; text: string[] },
      index: number,
    ) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode;
  title: string;
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
  description: ProductDescription;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}
