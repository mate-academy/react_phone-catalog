import {
  getEnumKeyByEnumValue,
  getEnumValueByKey,
  enumToArrayOfObjects,
  sortNumericField,
  addPropToItemsComparedAnotherItems,
  deleteItemFromArrayByField,
  addItemFromArrayByField,
  addDeleteExistItemFromArray,
  isItemInArray,
  capitalize,
  getRandomKey,
} from './utils';

import {
  getSearchWith,
  setSearchWith,
  type SearchParams,
} from './searchHelper';

import {
  getProducts,
  getBrandNewProducts,
  getHotPriceProducts,
  getProductsByCategory,
  getProductsQtyByCategory,
  getProductById,
  wait,
} from './fetchClient';

export {
  getEnumKeyByEnumValue,
  getEnumValueByKey,
  enumToArrayOfObjects,
  sortNumericField,
  addPropToItemsComparedAnotherItems,
  getProducts,
  getBrandNewProducts,
  getHotPriceProducts,
  getProductsByCategory,
  getProductById,
  deleteItemFromArrayByField,
  addItemFromArrayByField,
  addDeleteExistItemFromArray,
  wait,
  isItemInArray,
  getSearchWith,
  setSearchWith,
  SearchParams,
  capitalize,
  getRandomKey,
  getProductsQtyByCategory,
};
