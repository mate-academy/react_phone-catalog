// cartcontext.js
import {
  createContext, useContext, useReducer, useEffect,
} from 'react';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
const FULL_REMOVE_FROM_CART = 'FULL_REMOVE_FROM_CART';

const initialCartState = {
  cartProducts: JSON.parse(localStorage.getItem('cart')) || [],
  favoriteProducts: JSON.parse(localStorage.getItem('favorites')) || [],
};

const CartContext = createContext();
const FavoriteContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case FULL_REMOVE_FROM_CART: {
      const productId = action.payload;

      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          product => product.id !== productId,
        ),
      };
    }

    case ADD_TO_CART: {
      const productId = action.payload;
      const existingProduct = state.cartProducts
        .find((product) => product.id === productId);

      if (existingProduct) {
        return {
          ...state,
          cartProducts: state.cartProducts.map(
            (product) => (product.id === productId
              ? {
                ...product,
                quantity: (product.quantity || 0) + 1,
              } : product),
          ),
        };
      }

      return {
        ...state,
        cartProducts: [...state.cartProducts, { id: productId, quantity: 1 }],
      };
    }

    case REMOVE_FROM_CART: {
      const productId = action.payload;
      const updatedCartProducts = state.cartProducts.map((product) => {
        if (product.id === productId) {
          const updatedQuantity = product.quantity !== undefined
            ? Math.max(product.quantity - 1, 0) : 0;

          return updatedQuantity > 0
            ? { ...product, quantity: updatedQuantity } : null;
        }

        return product;
      }).filter(Boolean);

      return {
        ...state,
        cartProducts: updatedCartProducts,
      };
    }

    case ADD_TO_FAVORITES: {
      const productId = action.payload;

      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, productId],
      };
    }

    case REMOVE_FROM_FAVORITES: {
      const productId = action.payload;

      return {
        ...state,
        favoriteProducts: state.favoriteProducts
          .filter((id) => id !== productId),
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (productId) => {
    dispatch({ type: ADD_TO_CART, payload: productId });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };

  const addToFavorites = (productId) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: productId });
  };

  const removeFromFavorites = (productId) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: productId });
  };

  const fullRemoveFromCart = (productId) => {
    dispatch({ type: FULL_REMOVE_FROM_CART, payload: productId });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartProducts));
  }, [state.cartProducts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favoriteProducts));
  }, [state.favoriteProducts]);

  return (
    <FavoriteContext.Provider value={{
      ...state,
      addToFavorites,
      removeFromFavorites,
    }}
    >
      <CartContext.Provider
        value={{
          ...state,
          addToCart,
          removeFromCart,
          fullRemoveFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </FavoriteContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

export const useFavoritesContext = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useFavoritesContext must be used within a CartProvider');
  }

  return context;
};
