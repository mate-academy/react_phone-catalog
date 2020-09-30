  
import { AnyAction } from 'redux';

const ADD_CART_GOOD = 'ADD_CART_GOOD';
const REMOVE_CART_GOOD = 'REMOVE_CART_GOOD';
const INCREASE_COUNT = 'INCREASE_COUNT';
const DECREASE_COUNT = 'DECREASE_COUNT';
const CLEAR_CART = 'CLEAR_CART';
const SET_CART_GOODS = 'SET_CART_GOODS';

export const addCartGood = (good: Good) => ( {type: ADD_CART_GOOD, good} );
export const removeCartGood = (id: string) => ( {type: REMOVE_CART_GOOD, id} )
export const increaseGoodCount = (id: string) => ( {type: INCREASE_COUNT, id} );
export const decreaseGoodCount = (id: string) => ( {type: DECREASE_COUNT, id} );
export const setCartGoods = (goods: cartGood[]) => ( {type: SET_CART_GOODS, goods} );
export const clearCart = () => ({ type: CLEAR_CART });

let initialState: cartGood[] = [];

if (localStorage.getItem('cartProducts')) {
  initialState = [...JSON.parse(localStorage.getItem('cartProducts') || '')];
}

const cartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_CART_GOOD:
      return [
        ...state, {...action.good, count: 1},
      ];

    case REMOVE_CART_GOOD:
      return state.filter(good => good.id !== action.id)

    case INCREASE_COUNT:
      return state.map(good => ({
        ...good,
        count: action.id === good.id
          ? good.count + 1
          : good.count,
      }));

    case DECREASE_COUNT:
      return state.map(good => ({
        ...good,
        count: action.id === good.id && good.count > 1
          ? good.count - 1
          : good.count,
      }));

    case CLEAR_CART:
      return [];

    case SET_CART_GOODS:
      return action.goods;

    default:
      return state;
  }
};

export default cartReducer;
