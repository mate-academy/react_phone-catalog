import { ProductItem } from '../types/ProductItem';

export const productsFiltering = {
  getPhones: (productList: ProductItem[]) => {
    return productList.filter(product => product.category === 'phones');
  },

  getTablets: (productList: ProductItem[]) => {
    return productList.filter(product => product.category === 'tablets');
  },

  getAccessories: (productList: ProductItem[]) => {
    return productList.filter(product => product.category === 'accessories');
  },

  getHotPriceProducts: (productList: ProductItem[]) => {
    return [...productList]
      .sort((product1, product2) => {
        const hotness1 = 1 - product1.fullPrice / product1.price;
        const hotness2 = 1 - product2.fullPrice / product2.price;

        return hotness2 - hotness1;
      })
      .slice(0, 16);
  },

  getBrandNewProducts: (productList: ProductItem[]) => {
    return [...productList]
      .sort((product1, product2) => product2.price - product1.price)
      .slice(0, 16);
  },

  getRandomizedList: (productList: ProductItem[]) => {
    const shuffledList = [...productList];

    for (let i = shuffledList.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }

    return shuffledList;
  },

};
