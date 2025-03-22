import { ProductCategory } from '../constants/productCategory';

export type ProductDetails =
  | (BaseProductDetails & {
      category: ProductCategory.PHONES | ProductCategory.TABLETS;
      camera: string;
      zoom: string;
    })
  | (BaseProductDetails & { category: ProductCategory.ACCESSORIES });

export interface BaseProductDetails {
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
  };
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
}
