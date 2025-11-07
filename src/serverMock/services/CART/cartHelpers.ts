import { BECartItem, CartItem, ErrorObject, Status } from '@server/types';
import { getProduct } from '../GET';

type ItemError = {
  status: Status.ERROR;
  id: string;
  error: ErrorObject;
};

type Success = {
  status: Status.SUCCESS;
  data: BECartItem;
};

const processItem = async (
  el: string,
  amount: number,
): Promise<Success | ItemError> => {
  const fetchRes = await getProduct({ itemId: el });

  if (fetchRes.status !== Status.SUCCESS) {
    return {
      status: Status.ERROR,
      id: el,
      error: fetchRes,
    };
  }

  return {
    status: Status.SUCCESS,
    data: {
      product: fetchRes.data,
      amount: amount,
    },
  };
};

type FilterResult = {
  cart: BECartItem[];
  toUpload: CartItem[];
};

const filterStored = (items: CartItem[]): FilterResult => {
  const raw = sessionStorage.getItem('cart');

  const res: FilterResult = {
    cart: raw ? JSON.parse(raw) : [],
    toUpload: [],
  };

  if (res.cart.length === 0) {
    res.toUpload = [...items];

    return res;
  }

  for (const reqItem of items) {
    const itemInStorage = res.cart.find(el => el.product.id === reqItem.id);

    if (itemInStorage) {
      res.cart = res.cart.map(cartItem =>
        cartItem === itemInStorage
          ? { ...cartItem, amount: reqItem.amount }
          : cartItem,
      );
    } else {
      res.toUpload.push(reqItem);
    }
  }

  return res;
};

export { processItem, filterStored };
