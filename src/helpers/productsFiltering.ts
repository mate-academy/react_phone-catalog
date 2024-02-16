import { ProductItem } from '../types/ProductItem';

export const productsFiltering = {
  getCategoryProduct: (productList: ProductItem[], category: string) => {
    return productList.filter(product => product.category === category);
  },

  getCategoryTotal: (productList: ProductItem[], category: string) => {
    return productList.filter(product => product.category === category).length;
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

    return shuffledList.slice(0, 12);
  },

  filterQuery: (productList: ProductItem[], query: string) => {
    return productList.filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
  },

  sortBy: (productList: ProductItem[], sortBy: string) => {
    switch (sortBy) {
      case 'age':
        return productList.sort((item1, item2) => item2.year - item1.year);
      case 'name':
        return productList.sort((item1, item2) => {
          return item1.name.localeCompare(item2.name);
        });
      case 'price':
        return productList.sort((item1, item2) => item1.price - item2.price);
      default:
        return productList;
    }
  },

};
