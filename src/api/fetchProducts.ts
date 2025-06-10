
import { Product } from "../types/products";

export const fetchProducts = async (): Promise<Product[]> => {
  let response: Response;


      response = await fetch('./api/products.json');


  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();}

