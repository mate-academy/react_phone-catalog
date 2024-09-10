/* eslint-disable no-unused-vars */
import { LimitedProduct } from '../types/Product';

export const fetchProducts = async (category: string, sortMethod: string): Promise<LimitedProduct[]> => {

  const getSuggestedProducts = (filteredData: LimitedProduct[], count: number) => {
    let randomIndex: number = 0;
    let randomProducts: LimitedProduct[] = [];

      while (randomProducts.length < count) {
        randomIndex = Math.floor(Math.random() * filteredData.length);
        if (!randomProducts.includes(filteredData[randomIndex])) {
          randomProducts.push(filteredData[randomIndex]);
        }
      }
    return randomProducts;
  }

  try {
    const response = await fetch('https://meljaszuk.github.io/react_phone-catalog/api/products.json');
    const data: LimitedProduct[] = await response.json();

    let filteredData = data.filter((item) => item.category === category);

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
      case 'random':
        filteredData = data;
        filteredData = getSuggestedProducts(filteredData, 5);
        break;
      default: break;
    }

    return filteredData;
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};
