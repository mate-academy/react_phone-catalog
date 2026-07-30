type IncrementAction = { type: 'cartQuantities/INCREMENT'; payload: number };
type DecrementAction = { type: 'cartQuantities/DECREMENT'; payload: number };
type RemoveAction = { type: 'cartQuantities/REMOVE'; payload: number };

type CartAction = IncrementAction | DecrementAction | RemoveAction;

const incrementQuantity = (id: number): IncrementAction => ({
  type: 'cartQuantities/INCREMENT',
  payload: id,
});

const decrementQuantity = (id: number): DecrementAction => ({
  type: 'cartQuantities/DECREMENT',
  payload: id,
});

const removeQuantity = (id: number): RemoveAction => ({
  type: 'cartQuantities/REMOVE',
  payload: id,
});

/* eslint-disable @typescript-eslint/default-param-last */
const cartQuantitiesReducer = (
  state: { id: number; quantity: number }[] = [],
  action: CartAction,
) => {
  /* eslint-disable @typescript-eslint/indent */
  switch (action.type) {
    case 'cartQuantities/INCREMENT':
      return state.some(item => item.id === action.payload)
        ? state.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state, { id: action.payload, quantity: 2 }];

    case 'cartQuantities/DECREMENT':
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0);

    case 'cartQuantities/REMOVE':
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
};

export const actions = { incrementQuantity, decrementQuantity, removeQuantity };

export default cartQuantitiesReducer;
