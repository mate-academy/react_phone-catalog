import { LOADING_DELAY } from '../enums';
import { loadData, wait } from '../helpers';
import { ProductDetailType, ProductType } from '../types';

async function getProducts(): Promise<ProductType[]> {
  return loadData<ProductType[]>();
}

const productCache: Map<string, ProductDetailType> = new Map();

async function getProductDetail(id: string): Promise<ProductDetailType> {
  const cachedProduct = productCache.get(id);

  if (cachedProduct) {
    await wait(LOADING_DELAY);

    return cachedProduct;
  }

  const loadedProduct = await loadData<ProductDetailType>(id);

  productCache.set(id, loadedProduct);

  return loadedProduct;
}

export const productServices = {
  getProducts,
  getProductDetail,
};
