import { UpdatedProduct } from '../../../Types/types';

export const isAddedToList = (item: UpdatedProduct, list: UpdatedProduct[]) => {
  const listOfIds = list.map(prod => prod.itemId);

  return listOfIds.includes(item.itemId);
};

export const newListOfSavedItems = (
  product: UpdatedProduct,
  list: UpdatedProduct[],
) => {
  const copyOfList = [...list];
  const listOfIds = list.map(item => item.itemId);

  if (listOfIds.includes(product.itemId)) {
    return copyOfList.filter(card => card.itemId !== product.itemId);
  }

  return [...copyOfList, product];
};
