
import { Product } from "../types/products";

export const fetchProducts = async (category:string): Promise<Product[]> => {
  let response: Response;

  switch (category) {
    case 'phones': response = await fetch('./api/phones.json');
      break;

    case 'tablets': response = await fetch('./api/tablets.json');
      break;
    case 'accessories': response = await fetch('./api/accessories.json');
      break;


    default:
      response = await fetch('./api/products.json');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();}

