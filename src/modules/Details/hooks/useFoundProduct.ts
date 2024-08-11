/*eslint-disable @typescript-eslint/no-throw-literal */
import { useParams } from 'react-router-dom';

export const useFoundProduct = <T extends { id: string }>(
  products: T[],
  isLoaded: boolean,
) => {
  const { productId } = useParams();

  const foundProduct = products.find(product => product.id === productId);

  if (isLoaded && !foundProduct) {
    throw new Response('Not found', { status: 404 });
  }

  return foundProduct;
};
