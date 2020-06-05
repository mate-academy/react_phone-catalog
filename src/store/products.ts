import { AnyAction } from 'redux';

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_FAVORITES = 'SET_FAVORITES';

export const setProducts = (products: Products[]) => ({ type: SET_PRODUCTS, products });
export const setFavorites = (id: string) => ({ type: SET_FAVORITES, id });


const reducer = (products = [], action: AnyAction) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case SET_FAVORITES:
      return products.map((product: Products) => {
        if (!product.favorites && product.id === action.id) {
          return {
            ...product,
            favorites: true,
          };
        }

        if (product.favorites && product.id === action.id) {
          return {
            ...product,
            favorites: false,
          };
        }

        return product;
      });
    default:
      return products;
  }
};

export default reducer;
