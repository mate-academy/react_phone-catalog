import { client } from './fetchClient';
import { KeysOfStorage } from './types/KeysOfStorage';
import { NamesByCategories } from './types/NamesByCategories';
import { ProductFull } from './types/ProductFull';
import { ProductShort } from './types/ProductShort';

const getStorageValueBy = (items: ProductShort[], key: KeysOfStorage) => {
  const idsStr = localStorage.getItem(key);
  const ids: string[] = idsStr ? JSON.parse(idsStr) : [];

  return items
    .filter(product => ids.includes(product.phoneId));
};

const getProductByCategory = (
  items: ProductShort[], type: NamesByCategories,
) => {
  return items
    .filter(product => product.category === type);
};

const getSimilar = (items: ProductShort[], namespaceId: string) => {
  return items
    .filter(product => {
      const { capacity, itemId } = product;
      const numsCap = capacity
        .split('')
        .filter(ch => ch.toUpperCase() === ch.toLowerCase())
        .join('');
      const lastIndex = itemId.indexOf(numsCap) - 1;
      const correctItemId = itemId.slice(0, lastIndex);

      return correctItemId === namespaceId;
    });
};

const getSuggested = (items: ProductShort[], namespaceId: string) => {
  return items
    .filter(product => {
      const { capacity, itemId } = product;
      const numsCap = capacity
        .split('')
        .filter(ch => ch.toUpperCase() === ch.toLowerCase())
        .join('');
      const lastIndex = itemId.indexOf(numsCap) - 1;
      const correctItemId = itemId.slice(0, lastIndex);

      return correctItemId !== namespaceId;
    });
};

export const getAllProducts = () => {
  return client.get<ProductShort[]>('/products.json');
};

export const getProduct = (type: NamesByCategories) => getAllProducts()
  .then(items => getProductByCategory(items, type))
  .catch(mess => {
    throw mess;
  });

export const getDetailsBy = (productId: string) => {
  return client.get<ProductFull>(`/products/${productId}.json`);
};

export const getSimilarBy = (namespaceId: string) => getAllProducts()
  .then(items => getSimilar(items, namespaceId))
  .catch(mess => {
    throw mess;
  });

export const getSuggestedProducts = (namespaceId: string) => getAllProducts()
  .then(items => getSuggested(items, namespaceId))
  .catch(mess => {
    throw mess;
  });

export const getFavourites = () => getAllProducts()
  .then(items => getStorageValueBy(items, KeysOfStorage.Like))
  .catch(mess => {
    throw mess;
  });

export const getAddedToCart = () => getAllProducts()
  .then(items => getStorageValueBy(items, KeysOfStorage.Cart))
  .catch(mess => {
    throw mess;
  });
