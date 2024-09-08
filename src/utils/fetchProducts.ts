// @ts-ignore
import { LimitedProduct } from '../types/Product';

export const fetchProducts = async (category: string, sortMethod: string): Promise<LimitedProduct[]> => {
  try {
    const response = await fetch('https://meljaszuk.github.io/react_phone-catalog/api/products.json');
    const data: LimitedProduct[] = await response.json();

    const filteredData = data.filter((item) => item.category === category);

    switch (sortMethod) {
      case 'alpha':
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        filteredData.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
        filteredData.sort((a, b) => b.year - a.year);
        break;
      case 'hot':
        filteredData.sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));
        break;
      default: break;
    }

    return filteredData;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};
