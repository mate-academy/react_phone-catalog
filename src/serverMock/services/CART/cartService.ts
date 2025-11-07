import { CartData, CartItem, ServiceResult, Status } from '../../types';
import { filterStored, processItem } from './cartHelpers';

export const getCart = async (
  items: CartItem[],
): Promise<ServiceResult<CartData>> => {
  const response = {
    products: [],
    errors: [],
  } as CartData;

  const { cart, toUpload } = filterStored(items);

  response.products = cart;

  for (const cartItem of toUpload) {
    const processedItem = await processItem(cartItem.id, cartItem.amount);

    if (processedItem.status !== Status.SUCCESS) {
      const { id, error } = processedItem;

      response.errors.push({ id, error });
      continue;
    }

    const { data } = processedItem;

    response.products.push(data);
  }

  sessionStorage.setItem('cart', JSON.stringify(response.products));

  return { status: Status.SUCCESS, data: response };
};
