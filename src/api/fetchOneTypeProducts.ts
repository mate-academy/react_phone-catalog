import { FullProduct } from '../types/product';
type ProductDetails = {
  product: FullProduct;
  models: FullProduct[];
};

export const fetchOneProducts = async (
  category: string,
  id: string,
): Promise<ProductDetails> => {
  let response: Response;

  switch (category) {
    case 'phones':
      response = await fetch('./api/phones.json');
      break;

    case 'tablets':
      response = await fetch('./api/tablets.json');
      break;
    case 'accessories':
      response = await fetch('./api/accessories.json');
      break;

    default:
      throw new Error('undefined category');
  }

  const products: FullProduct[] = await response.json();
  const product = products.find(item => item.id === id);
  const models = products.filter(
    item => item.namespaceId === product?.namespaceId,
  );

  if (!product) {
    throw new Error('Product not Found');
  }

  return { product, models };
};
