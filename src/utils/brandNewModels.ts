import { Product, ProductOtherData } from '../types/Product';
import { newestYearPhone } from './newestYearProduct';

export const brandNewModels = (
  products: Product[],
  productList: ProductOtherData[],
  spec: keyof Product,
  specValue: string,
) => {
  const newestYearProduct = newestYearPhone(productList);

  return products.filter(model => {
    const productionYear = productList.find(
      product => product.itemId === model.id,
    )?.year;

    return productionYear === newestYearProduct && model[spec] === specValue;
  });
};
