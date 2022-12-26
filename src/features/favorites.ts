import { Product } from '../types/Product';

type AddAction = { type: 'favorites/ADD', payload: Product };
type RemoveAction = { type: 'favorites/REMOVE', payload: Product };

const add = (value: Product): AddAction => (
  { type: 'favorites/ADD', payload: value }
);
const remove = (value: Product): RemoveAction => (
  { type: 'favorites/REMOVE', payload: value }
);

type Action = AddAction | RemoveAction;

const initialValue: Product[]
  = JSON.parse(localStorage.getItem('favorites') || '[]');

const favoritesReducer = (favorites = initialValue, action: Action) => {
  switch (action.type) {
    case 'favorites/ADD': {
      const modifiedFavorites = [...favorites, action.payload];

      localStorage.setItem('favorites', JSON.stringify(modifiedFavorites));

      return modifiedFavorites;
    }

    case 'favorites/REMOVE': {
      const modifiedFavorites = [
        ...favorites.filter(product => product.id !== action.payload.id),
      ];

      localStorage.setItem('favorites', JSON.stringify(modifiedFavorites));

      return modifiedFavorites;
    }

    default:
      return favorites;
  }
};

export const actions = { add, remove };
export default favoritesReducer;
