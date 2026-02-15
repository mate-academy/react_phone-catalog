import { ProductCard } from '../types/ProductCard';
import { getDataPublic } from './getDataPublic';

export async function goToInfo(
  navigate: (v: string) => void,
  name: string,
  category: string,
) {
  try {
    const response = await getDataPublic(category, 10);
    const currentProduct = response.find((el: ProductCard) => el.id === name);

    if (!currentProduct) {
      throw new Error('Product not found');
    }

    const newParams = new URLSearchParams();

    newParams.set('capacity', currentProduct.capacity);
    newParams.set('color', currentProduct.color);

    navigate(
      `/${category}/${currentProduct.namespaceId}?${newParams.toString()}`,
    );
  } catch (error) {
    throw new Error(`Problem with catch goToInfo: (${error})`);
  }
}
