import { ProductOfCart } from '../types/ProductOfCart';

type AddAction = { type: 'cart/ADD', payload: ProductOfCart };

type RemoveAction = { type: 'cart/REMOVE', payload: ProductOfCart };

type IncreaseAction = { type: 'cart/INCREASE', payload: ProductOfCart };

type DecreaseAction = { type: 'cart/DECREASE', payload: ProductOfCart };

const add = (value: ProductOfCart): AddAction => (
  { type: 'cart/ADD', payload: value }
);

const remove = (value: ProductOfCart): RemoveAction => (
  { type: 'cart/REMOVE', payload: value }
);

const increase = (value: ProductOfCart): IncreaseAction => (
  { type: 'cart/INCREASE', payload: value }
);

const decrease = (value: ProductOfCart): DecreaseAction => (
  { type: 'cart/DECREASE', payload: value }
);

type Action = AddAction | RemoveAction | IncreaseAction | DecreaseAction;

const initialCart: ProductOfCart[]
  = JSON.parse(localStorage.getItem('cart') || '[]');

const cartReducer = (cart = initialCart, action: Action) => {
  switch (action.type) {
    case 'cart/ADD':
      localStorage.setItem('cart', JSON.stringify([...cart, action.payload]));

      return [...cart, action.payload];

    case 'cart/REMOVE':
      localStorage.setItem('cart', JSON.stringify(
        [...cart.filter(product => product.id !== action.payload.id)],
      ));

      return [...cart.filter(product => product.id !== action.payload.id)];

    case 'cart/INCREASE': {
      const modifiedItems = [...cart.map(cartItem => {
        if (cartItem.product.id === action.payload.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }

        return { ...cartItem };
      })];

      localStorage.setItem('cart', JSON.stringify(modifiedItems));

      return modifiedItems;
    }

    case 'cart/DECREASE':
      if (action.payload.quantity > 1) {
        const modifiedItems = [...cart.map(cartItem => {
          if (cartItem.product.id === action.payload.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }

          return { ...cartItem };
        })];

        localStorage.setItem('cart', JSON.stringify(modifiedItems));

        return modifiedItems;
      }

      return cart;

    default:
      return cart;
  }
};

export const actions = {
  add, remove, increase, decrease,
};
export default cartReducer;
