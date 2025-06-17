export interface BaseItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  namespaceId: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: {
    title: string;
    text: string[];
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
  model?: string;
  price: number;
  capacityPrice: {
    [key: string]: number;
  };
}

export interface Phone extends BaseItem {
  // Specific properties for Phone
  screenSize?: string;
}

export interface Tablet extends BaseItem {
  // Specific properties for Tablet
  stylusSupport?: boolean;
}

export interface Accessories extends BaseItem {
  // Specific properties for Accessories
  warranty?: string;
  id: string;
  name: string;
  images: string[];
  price: number;
}
