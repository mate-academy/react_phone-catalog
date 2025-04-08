import { client } from './fetchClient';
import { Product } from '../types/Product';
import { Products } from '../types/Products';

export const getProducts = (category: string) => {
  return client.get<Product[]>(`api/${category}.json`)
}

export const getAllProducts = () => {
  return client.get<Products[]>(`api/products.json`)
}

export const addFavouriteProduct = (product: Product) => {
  return client.post<Product>(`api/favourites.json`, product)
}

// export const addProduct = ({})