export type Products = {
  id: number;
  image: string;
  name: string;
  images: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  priceRegular: number;
  priceDiscount: number;
};

export type Props = {
  products: Products[];
};
