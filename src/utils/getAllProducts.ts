import { getProducts } from './getProducts';
import { Product } from '../types/Product';
import { ProductType } from '../types/ProductType';
import { FetchDataType } from '../types/FetchDataType';

export const getAllProducts = async (
  fetchedCategories: ProductType[],
  signal: AbortSignal,
  productList: Product[],
) => {
  const fetchCategories = Object.keys(ProductType).filter(
    category => !fetchedCategories.includes(category as ProductType),
  ) as FetchDataType[];

  return Promise.all(
    fetchCategories.map(category => getProducts(category, signal)),
  ).then(results => {
    const allProducts = [...productList];

    results.forEach((result: Product[]) => allProducts.push(...result));

    return allProducts;
  });
};
