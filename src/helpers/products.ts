import { Item } from '../types/Item';
import { Product } from '../types/Product';
import { client } from './fetchClient';

export const getProducts = () => {
  return client.get<Product[]>();
};

export const getItem = (url?: string) => {
  return client.get<Item>(url);
};

// export const addProduct = (
//   { userId, title, completed }: Omit<Product, 'id'>,
// ) => {
//   return client.post<Product>(`/todos?userId=${userId}`, { userId, title, completed });
// };

// export const deleteProduct = (postId: number) => {
//   return client.delete(`/todos/${postId}`);
// };

// export const updateProduct = ({
//   id, userId, title, completed,
// }: Product) => {
//   return client.patch<Product>(`/todos/${id}`, { userId, title, completed });
// };
