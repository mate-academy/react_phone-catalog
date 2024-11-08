import { TProduct } from '@utils/types/product.type';
import {
  TNewItemId,
  TUpdateProductParams,
} from '@utils/types/productUtils.type';

export const filterByCategory = (products: TProduct[], text: string) => {
  if (!text) return products;
  return products.filter(product => product.category === text);
};

export const getProductUrl = (category: string, itemId: string) => {
  return `/${category}/${itemId}`;
};

export const getNewItemId = (obj: TNewItemId) => {
  const groupByNameSpaceId = obj.productsWithDetails.filter(
    product => product.namespaceId === obj.nameSpaceId,
  );

  const foundProduct = groupByNameSpaceId.find(
    product =>
      product.category === obj.category &&
      product.capacity === obj.capacity &&
      product.color === obj.color,
  );

  return foundProduct?.id;
};

export const updateProduct = ({
  selectedProduct,
  newCapacity,
  newColor,
  productsWithDetails,
  navigate,
}: TUpdateProductParams) => {
  const newItemId = getNewItemId({
    category: selectedProduct.category,
    capacity: newCapacity || selectedProduct.capacity,
    color: newColor || selectedProduct.color,
    nameSpaceId: selectedProduct.namespaceId,
    productsWithDetails,
  });

  if (newItemId) {
    navigate(getProductUrl(selectedProduct.category, newItemId), {
      state: { itemId: newItemId },
    });
  }
};
