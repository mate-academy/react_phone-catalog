import { error } from "console";
import { Product } from "../types/product";


export const fetchOneProducts = async (category: string, id:string): Promise<Product> => {
let response: Response;
  switch (category) {

    case 'phones': response = await fetch('./api/phones.json');
      break;

    case 'tablets': response = await fetch('./api/tablets.json');
      break;
    case 'accessories': response = await fetch('./api/accessories.json');
      break;


    default:
     throw new Error ('undefined category');
  }
  const products: Product[] = await response.json();
  const product = products.find(item => item.id === id)
  if (!product) {
    throw new Error('Product not Found');
  }
  return product;
}
