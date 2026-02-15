import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import phonesReducer from '../features/phones';
import tabletReducer from '../features/tablets';
import accessoriesReducer from '../features/accessories';
import screenWidthReducer from '../features/screenWidth';
import paginationReducer from '../features/pagination';
import favoriteReducer from '../features/favorite';
import cartReducer from '../features/cart';
import ProductNameReducer from '../features/productName';
import { selectedPostReducer } from '../features/selectedPost';
import { commentsReducer } from '../features/comment';
import { postsReducer } from '../features/posts';
import { usersReducer } from '../features/users';
import { authorReducer } from '../features/author';

const rootReducer = combineReducers({
  products: productsReducer,
  phones: phonesReducer,
  tablets: tabletReducer,
  accessories: accessoriesReducer,
  screenWidth: screenWidthReducer,
  pagination: paginationReducer,
  favorite: favoriteReducer,
  cart: cartReducer,
  productName: ProductNameReducer,
  selectedPost: selectedPostReducer,
  comments: commentsReducer,
  posts: postsReducer,
  users: usersReducer,
  author: authorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
