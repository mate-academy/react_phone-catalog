type InferValueTypes<T> = T extends { [key: string]: infer U} ? U : never;

export const actions = {
  addToCart: (product: Product, id: string, price: number) => (
    {
      type: 'ADD_TO_CART', product, id, price,
    } as const
  ),
  deleteFromCart: (id: string, price: number) => (
    { type: 'DELETE_FROM_CART', id, price } as const
  ),
  resetCart: () => ({ type: 'RESET_CART' } as const),
  addQuantity: (id: string, price: number) => (
    { type: 'ADD_QUANTITY', id, price } as const
  ),
  subtractQuantity: (id: string, price: number) => (
    { type: 'SUBTRACT_QUANTITY', id, price } as const
  ),
};

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;


const initialState = {
  cartItems: [] as Product[],
  price: 0,
};

type InitialState = typeof initialState;

const cartItemsReducer = (state = initialState, action: ActionTypes): InitialState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.product]
          .map((item) => {
            if (item.id === action.id) {
              return { ...item, quantity: 1 };
            }

            return { ...item, quantity: item.quantity };
          }),
        price: state.price + action.price,
      };

    case 'DELETE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.id),
        price: state.cartItems.find(
          item => item.id === action.id,
        )!.quantity! > 1
          ? state.price - state.cartItems.find(
            item => item.id === action.id,
          )!.quantity! * action.price
          : state.price - action.price,
      };

    case 'ADD_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => ({
          ...item,
          quantity: item.id === action.id
            ? item.quantity! + 1
            : item.quantity,
        })),
        price: state.price + action.price,
      };

    case 'SUBTRACT_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => ({
          ...item,
          quantity: item.id === action.id
            ? item.quantity! - 1
            : item.quantity,
        })),
        price: state.price - action.price,
      };

    case 'RESET_CART':
      return {
        cartItems: [],
        price: 0,
      };

    default:
      return state;
  }
};

export default cartItemsReducer;
