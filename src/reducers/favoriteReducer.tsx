type State = {
  favorites: string[];
};

type Action =
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string };

export const favoriteReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return {
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        favorites: state.favorites.filter(id => id !== action.payload),
      };
    default:
      return state;
  }
};
