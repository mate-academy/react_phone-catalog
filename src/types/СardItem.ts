export interface CardItem {
  id: string;
  name: string;
  img: string;
  price: number;
  oldPrice?: number;
  screen?: string;
  capacity?: string;
  ram?: string;
  isFavorite?: boolean;
  link: string;
  color?: string;
}
