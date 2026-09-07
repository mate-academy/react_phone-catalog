export type CartProduct =
  | {
    id: string;
    name: string;
    images: string[];
    price?: number;
    priceDiscount?: number;
    fullPrice?: number;
  }
  | {
    id: string;
    name: string;
    image: string;
    price?: number;
    priceDiscount?: number;
    fullPrice?: number;
  };
