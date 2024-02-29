export interface Product {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export interface CardProduct extends Product {
  quantity: number;
}

export interface FavoriteProduct extends Product {
  isFavorite: boolean;
}
