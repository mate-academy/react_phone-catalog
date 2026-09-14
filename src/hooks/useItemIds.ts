import { useEffect, useReducer } from 'react';
type Quantities = Record<string, number>;

type State = {
  itemIds: string[];
  quantities: Quantities;
};
type Action =
  | { type: 'add'; itemId: string }
  | { type: 'remove'; itemId: string }
  | { type: 'setQuantity'; itemId: string; quantity: number }
  | { type: 'clear' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add': {
      if (state.itemIds.includes(action.itemId)) {
        return state;
      }

      return {
        itemIds: [...state.itemIds, action.itemId],
        quantities: { ...state.quantities, [action.itemId]: 1 },
      };
    }

    case 'remove': {
      const { [action.itemId]: removed, ...restQuantities } = state.quantities;

      return {
        itemIds: state.itemIds.filter(itemId => itemId !== action.itemId),
        quantities: restQuantities,
      };
    }

    case 'setQuantity': {
      if (!state.itemIds.includes(action.itemId)) {
        return state;
      }

      const clamped = Math.min(10, Math.max(1, action.quantity));

      return {
        ...state,
        quantities: { ...state.quantities, [action.itemId]: clamped },
      };
    }

    case 'clear':
      return { itemIds: [], quantities: {} };

    default:
      return state;
  }
};

const getStoredState = (storageKey: string): State => {
  try {
    const value = localStorage.getItem(storageKey);
    const parsedValue: unknown = value && JSON.parse(value);

    if (Array.isArray(parsedValue)) {
      const itemIds = parsedValue.every(id => typeof id === 'string')
        ? parsedValue
        : [];

      return {
        itemIds,
        quantities: Object.fromEntries(itemIds.map(id => [id, 1])),
      };
    }

    if (parsedValue && typeof parsedValue === 'object') {
      const { itemIds, quantities } = parsedValue as Partial<State>;

      return {
        itemIds: Array.isArray(itemIds) ? itemIds : [],
        quantities:
          quantities && typeof quantities === 'object' ? quantities : {},
      };
    }

    return { itemIds: [], quantities: {} };
  } catch {
    return { itemIds: [], quantities: {} };
  }
};

export const useItemIds = (storageKey: string) => {
  const [state, dispatch] = useReducer(reducer, storageKey, getStoredState);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const totalCount = Object.values(state.quantities).reduce(
    (sum, count) => sum + count,
    0,
  );

  return {
    itemIds: state.itemIds,
    quantities: state.quantities,
    totalCount,
    addItem: (itemId: string) => dispatch({ type: 'add', itemId }),
    removeItem: (itemId: string) => dispatch({ type: 'remove', itemId }),
    setQuantity: (itemId: string, quantity: number) =>
      dispatch({ type: 'setQuantity', itemId, quantity }),
    clearItems: () => dispatch({ type: 'clear' }),
  };
};
