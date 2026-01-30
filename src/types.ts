export type Products = {
  id: number;
  name: string;
  images: string;
  priceRegular: number;
  priceDiscount: number;
};

export type Props = {
  phones: Products[];
};
