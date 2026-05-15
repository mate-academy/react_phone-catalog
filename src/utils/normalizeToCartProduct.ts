import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductsDetails';

export interface ProductForCart {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export function normalizeToCartProduct(
  value: Product | ProductDetails,
): ProductForCart {
  if ('itemId' in value) {
    return {
      id: value.itemId,
      name: value.name,
      price: value.price,
      image: value.image,
      category: value.category,
    };
  } else {
    return {
      id: value.id,
      name: value.name,
      price: value.priceDiscount,
      image: value.images[0],
      category: value.category,
    };
  }
}
