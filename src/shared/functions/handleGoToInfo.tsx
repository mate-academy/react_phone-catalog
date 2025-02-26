import { ProductCard } from '../types/ProductCard';
import { getDataPublic } from './getDataPublic';

export async function goToInfo(navigate: any, name: string, category: string) {
  try {
    const response = await getDataPublic(category, 10);
    const currentProduct = response.find((el: ProductCard) => el.id === name);

    if (!currentProduct) {
      throw new Error('Product not found');
    }

    navigate(`/${category}/${currentProduct.namespaceId}`);
  } catch (error) {
    throw new Error(`provlem with catch GoToInfo: (${error})`);
  }
}
