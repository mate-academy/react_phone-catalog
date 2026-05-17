import { ProdCard, Product } from '../../types/Product';

export const adaptedProductList = (product: Product): ProdCard => {
  return {
    id: product.itemId,
    name: product.name,
    price: product.price,
    fullPrice: product.fullPrice,
    img: product.image,
    year: product.year,
    specs: [
      { name: 'Screen', value: product.screen },
      { name: 'Capacity', value: product.capacity },
      { name: 'RAM', value: product.ram },
    ],
  };
};
