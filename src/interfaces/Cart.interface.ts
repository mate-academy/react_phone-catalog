import { IProductCard } from "./ProductCard.interface";

export interface ICart {
  id: number,
  product: IProductCard,
  quantity: number,
  price: number,
}

export interface IInitialStateCart {
  items: ICart[],
  totalPrice: number,
}

export interface IChangQuantityPayload {
  id: number,
  type: 'minus' | 'plus',
}