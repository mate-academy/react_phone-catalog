import { client } from '../utils/fetchClient';

import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductFromCategory = (category: Category) => {
  switch (category) {
    case Category.Phone: {
      return client.get<ProductDetails[]>('/phones.json');
    }

    case Category.Tablet: {
      return client.get<ProductDetails[]>('/tablets.json');
    }

    case Category.Accessories: {
      return client.get<ProductDetails[]>('/accessories.json');
    }
  }
};
