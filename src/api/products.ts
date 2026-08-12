import { getData } from './client';
import { withMinDelay } from '../utils/withMinDelay';
import type { Language } from '../types/language';
import type {
  ProductCategory,
  ProductDetailsFromServer,
  ProductFromServer,
} from '../types/product';

const DEMO_LOADING_DELAY = 700;

const getLanguagePrefix = (language: Language) => {
  return `api/${language}`;
};

const getDetailsEndpoint = (category: ProductCategory, language: Language) => {
  return `${getLanguagePrefix(language)}/${category}.json`;
};

export const getProducts = (language: Language) => {
  return withMinDelay(
    getData<ProductFromServer[]>(
      `${getLanguagePrefix(language)}/products.json`,
    ),
    DEMO_LOADING_DELAY,
  );
};

export const getProductDetails = (
  category: ProductCategory,
  language: Language,
) => {
  return withMinDelay(
    getData<ProductDetailsFromServer[]>(getDetailsEndpoint(category, language)),
    DEMO_LOADING_DELAY,
  );
};

export const getPhones = (language: Language) => {
  return getProductDetails('phones', language);
};

export const getTablets = (language: Language) => {
  return getProductDetails('tablets', language);
};

export const getAccessories = (language: Language) => {
  return getProductDetails('accessories', language);
};

export const getAllProductDetails = async (language: Language) => {
  const [phones, tablets, accessories] = await Promise.all([
    getPhones(language),
    getTablets(language),
    getAccessories(language),
  ]);

  return [...phones, ...tablets, ...accessories];
};

export const getProductDetailsById = async (
  category: ProductCategory,
  itemId: string,
  language: Language,
) => {
  const products = await getProductDetails(category, language);

  return products.find(product => product.id === itemId) || null;
};
