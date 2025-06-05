import { ProductCategory } from '../constants/productCategory';

export interface CommonProduct {
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
  description: {
    title: string;
    text: string;
  }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}

interface PhoneOrTabletDetails extends CommonProduct {
  category: ProductCategory.PHONES | ProductCategory.TABLETS;
  camera: string;
  zoom: string;
}

interface AccessoryDetails extends CommonProduct {
  category: ProductCategory.ACCESSORIES;
}
export type ProductDetails = PhoneOrTabletDetails | AccessoryDetails;
